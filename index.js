const fetch = require('node-fetch-commonjs')
const express = require("express")
const { initializeApp } = require('firebase/app')
const bodyParser = require('body-parser')
const { getFirestore, setDoc, doc, getDoc, query, getDocs, collection } = require('firebase/firestore/lite')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const accountSid = "AC1eea0a6f6943c336f1cb94961b25dc51"
const authToken = "377f78e0572fcaac67be57f4a069855f"
const number = "whatsapp:+15165189647"
const twilio = require('twilio')(accountSid, authToken)
const { MessagingResponse } = require('twilio').twiml

app.listen(5000)

const firebaseConfig = {
    apiKey: "AIzaSyDG2ffZQhmO0xFmFPTy4Gt_CS8tSQD7Aw0",
    authDomain: "shepherd-a1e51.firebaseapp.com",
    projectId: "shepherd-a1e51",
    storageBucket: "shepherd-a1e51.appspot.com",
    messagingSenderId: "497639325389",
    appId: "1:497639325389:web:fe2848ffa4c09af9237384",
    measurementId: "G-855TE47MY1"
}
initializeApp(firebaseConfig)
const db = getFirestore()

const read = function () {
    return new Promise(function (resolve, reject) {
        let final = {}
        const collectionRef = collection(db, 'whatsapp')
        getDocs(collectionRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    final[doc.id] = doc.data()
                })
                resolve(final)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}
  
const write = function (docId, newData) {
    return new Promise(function (resolve, reject) {
        const collectionRef = collection(db, 'whatsapp')
        const docRef = doc(collectionRef, docId)
        setDoc(docRef, newData)
            .then(() => {
                resolve('Data written successfully.')
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
        })
}

let getResponse = function (messageHistory, newMessage) {
    return new Promise(function (resolve, reject) {
        let gptMessages = [{ "role": "user", "content": "You are a friendly tool to help people follow their path in Christianity. Here are some rules and examples that you should follow: You should always provide advice based on the essence of Bible verses. While you may add secular advice that aligns with the teachings of the verse, it should never give opinionated secular advice. You empathize briefly before providing the verse. You can personalize your messages by using the word you. For sensitive topics, you should focus on providing Bible verses and explaining their meanings, without offering extensive secular advice. In responses to queries, you should focus on a primary verse that is most relevant to the query or topic and a summary of what the verse means. In dealing with sensitive or controversial topics, you should exercise caution. You should offer uplifting verses, refrain from subjective advice, and recommend that the user talk to a trusted individual about their issues. If a query is unrelated to the Bible, you should remind users that your there to assist with Bible-related questions and cannot provide expertise in unrelated areas. You should avoid using first-person language to maintain your role as a tool or resource, not a conversational partner. For example, instead of saying 'I suggest reading this verse...', the you could say 'Consider this verse...' or This verse might be helpful...'. The language should still be friendly and accessible, but you should not create an impression of having your own thoughts or feelings. Do you understand?" }, { "role": "assistant", "content": "Yes, I understand and will follow all of these rules and examples that you have set for me." }]
        if(messageHistory.length <= 9) {
            for(let i = 0; i < messageHistory.length; i++) {
                gptMessages.push(messageHistory[i])
            }
        } else {
            for(let i = 0; i < 6; i++) {
                gptMessages.push(messageHistory[i])
            }

            for(let i = messageHistory.length - 3; i < messageHistory.length; i++) {
                gptMessages.push(messageHistory[i])
            }
        }
        gptMessages.push(newMessage)
    
        let requestOptions = {
             method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "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"
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: gptMessages,
                max_tokens: 750,
                temperature: 0.1
            })
        }
    
        fetch("https://api.openai.com/v1/chat/completions", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(gptMessages)
                console.log(data)
                resolve(data.choices[0].message.content)
            })	
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}

let sendMessage = function (to, body) {
    return new Promise(async function (resolve, reject) {
        try {
            await twilio.messages.create({ from: number, body: body, to: to})
        } catch(error) {
            console.log(error)
        }
        resolve("Success")
    })
}

let handleInbound = function (body, from) {
    return new Promise(async function (resolve, reject) {
        try {
            if(body !== "") {
                let current = await read()
                let user = current[from.replace("whatsapp:+", "")]
                let newResponse = ""
                let newStep = 0
                if(user !== undefined) {
                    if(user.Step == 0) {
                        newResponse = "What's your name?"
                        await sendMessage(from, newResponse)
                        newStep = 1
                    } else if(user.Step == 1) {
                        newResponse = `Thanks, ${body}. And do you have a preference for the bible version? e.g. NIV / KJV. (It's also fine if you don't)`
                        await sendMessage(from, newResponse)
                        newStep = 2
                    } else if(user.Step == 2) {
                        newResponse = `Great - you're all set up. Is there anything on your mind today?`
                        await sendMessage(from, newResponse)
                        newStep = 3
                    } else {
                        let response = await getResponse(user.History, {"role": "user", "content": body})
                        newResponse = response
                        await sendMessage(from, newResponse)
                        newStep = 3
                    }
                    user.History.push({"role": "user", "content": body})
                    user.History.push({"role": "assistant", "content": newResponse})
                    let updatedUser = {
                        "Number": user.Number,
                        "Step": newStep,
                        "History": user.History
                    }
                    write(from.replace("whatsapp:+", ""), updatedUser)
                    resolve("Success")
                } else {
                    let newNumber = from.replace("whatsapp:+", "")

                    try {
                        let current = await read()
                        if(current[newNumber] == undefined) {
                            await sendMessage(`whatsapp:+${newNumber}`, "Welcome to Shepherd! It's a pleasure to have you on board. You can message at any time with questions or queries. All responses are all based on the Word of the Bible. Let's grow together 🌱.")
                            await sendMessage(`whatsapp:+${newNumber}`, "What's your name?")
                            await write(newNumber.replace("whatsapp:+", ""), {"History": [{"role": "assistant", "content": "Welcome to Shepherd! It's a pleasure to have you on board. You can message at any time with questions or queries. All responses are all based on the Word of the Bible. Let's grow together 🌱."}, {"role": "assistant", "content": "What's your name?"}], "Number": newNumber, "Step": 1})
                        } else {
                            await sendMessage(`whatsapp:+${newNumber}`, "Looks like you tried to initiate a chat with me again. You can just directly talk to me here.")
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        } catch(error) {
            console.log("Error: "+error)
        }
    })
}

app.post("/get-message", (req, res) => {
    handleInbound(req.body.Body, req.body.From)
    res.send(req.body.Body)
})
