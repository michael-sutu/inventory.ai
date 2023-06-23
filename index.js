const express = require("express")
const multer = require('multer')
const path = require("path")
const fs = require("fs")
const { MongoClient, ServerApiVersion } = require('mongodb')
const md5 = require('md5')
const fetch = require("node-fetch-commonjs")
const app = express()

app.listen(1000)
console.log("Listening at http://localhost:1000")

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/Resources/User-Images/')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, Date.now() + extension)
  }
})

let upload = multer({ storage: storage })
let type = upload.single('upl')

const url = "mongodb+srv://michaelsutu:AJV95ixy12LSkBfA@inventoryai.1lwuiqu.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url)

function sendF(file, res) {
	return res.sendFile(__dirname+`/${file}`)
}

function makeid(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

app.get("/", (req, res) => {
	sendF("Public/index.html", res)
})

let validFiles = ["script.js", "styles.css", "module.js", "bubbles.css"]
app.get("/file/:path", (req, res) => {
	if(validFiles.includes(req.params.path)) {
		sendF("Resources/"+req.params.path, res)
	} else {
		res.json({"Code": 404, "Message": "Page not found."})
	}
})

let validImages = ["logo.png", "favicon.png", "title.png", "google.png", "facebook.png", "placeholder.png", "placeholder2.png", "xsold.png", "sold.png", "xsettings.png", "settings.png", "xaccounts.png", "accounts.png", "xbox.png", "box.png", "balance.png", "xbalance.png", "amazon.jpg", "bonanza.png", "ebay.png"]
app.get("/image/:path", (req, res) => {
	if(validImages.includes(req.params.path)) {
		sendF("Resources/Images/"+req.params.path, res)
	} else {
		res.json({"Code": 404, "Message": "Page not found."})
	}
})

app.get("/user-images/:path", (req, res) => {
	sendF("Resources/User-Images/"+req.params.path, res)
})

app.get("/api/account", async (req, res) => {
	let action = req.query.type
	if(action == "new") {
		await client.connect()
		const db = client.db("users")
		let current = await db.collection("people").findOne({"Email": req.query.email})
		if(current == null) {
			let pass = true
			let private = makeid(15)
			try {
				await db.collection("people").insertOne({
  				"Email": req.query.email,
					"Password": req.query.password,
					"Id": makeid(7),
					"Private": private,
					"Owns": []
				})
			} catch(error) {
				pass = false
				console.log(error)
				res.json({"Code": 400, "Error": error})
			}
			if(pass == true) {
				res.json({"Code": 200, "Message": "Successfully created new account.", "Private": private})
			}
		} else {
			res.json({"Code": 401, "Error": "Email is already in use."})
		}
	} else if(action == "login") {
		try {
			const db = client.db("users")
			let final = await db.collection("people").findOne({"Email": req.query.email})
      if(final == null) {
       	 res.json({"Code": 401.1, "Error": "Unknown email."})
      } else {
        if(final.Password == req.query.password) {
        	res.json({"Code": 200, "Message": "Login Successful.", "Private": final.Private})
        } else {
          res.json({"Code": 401.2, "Error": "Invalid password."})
        }
      }
		} catch(error) {
			console.log(error)
			res.json({"Code": 400, "Error": error})
		}
	} else if(action == "get") {
		try {
			await client.connect()
			const db = client.db("users")
			let pulled = await db.collection("people").findOne({"Private": req.query.private})
			if(pulled == null) {
				res.json({"Code": 401, "Error": "Unknown private."})
			} else {
				res.json({"Code": 200, "Data": {"Email": pulled.Email, "Owns": pulled.Owns}, "Message": "Successfully pulled user data."})
			}
		} catch(error) {
			console.log(error)
			res.json({"Code": 400, "Error": error})
		}
	}
})

app.post("/api/inventory", type, async (req, res) => {
	let action = req.query.type
	if(action == "new") {
		try {
			let updatedOwns = []
			let newItem = {
				"Image": req.file.filename,
				"Name": req.query.name,
				"Value": req.query.value
			}
			await client.connect()
			const db = client.db("users")
			let current = await db.collection("people").findOne({"Private": req.query.private})
			if(current) {
				current.Owns.push(newItem)
				updatedOwns = current.Owns
				const result = await db.collection("people").updateOne({ Private: req.query.private }, { $set: { Owns: updatedOwns }})
				res.json({"Code": 200, "Message": "Successfully added item to inventory."})
			} else {
				res.json({"Code": 401, "Error": "Unkown private key."})
			}
		} catch(error) {
			console.log(error)
			res.json({"Code": 400, "Error": error})
		}
	}
})

app.get("/api/save-item", async (req, res) => {
    try {
        let updatedOwns = []
		let newItem = {
			"Image": req.query.image,
			"Name": req.query.name,
			"Min": req.query.min,
            "Max": req.query.max,
            "Quantity": req.query.quantity,
            "Condition": req.query.condition
		}
		await client.connect()
		const db = client.db("users")
		let current = await db.collection("people").findOne({"Private": req.query.private})
		if(current) {
			current.Owns.push(newItem)
			updatedOwns = current.Owns
			await db.collection("people").updateOne({ Private: req.query.private }, { $set: { Owns: updatedOwns }})
			res.json({"Code": 200, "Message": "Successfully added item to inventory."})
		} else {
			res.json({"Code": 401, "Error": "Unkown private key."})
		}
    } catch(error) {
        console.log(error)
        res.json({"Code": 400, "Error": error})
    }
})

app.post("/api/get-value", type, (req, res) => {
    let name = req.query.name
    let condition = req.query.condition
    let image = req.file.filename

    let url = 'https://svcs.ebay.com/services/search/FindingService/v1'
    let appID = 'MichaelS-inventor-PRD-f95f6f890-8fec23b2'
    let request = {
        'OPERATION-NAME': 'findCompletedItems',
        'SERVICE-VERSION': '1.13.0',
        'SECURITY-APPNAME': appID,
        'RESPONSE-DATA-FORMAT': 'JSON',
        'keywords': name,
        'itemFilter(0).name': 'SoldItemsOnly',
        'itemFilter(0).value': 'true'
    }

    let queryString = Object.keys(request)
        .map(function(key) {
            return key + '=' + encodeURIComponent(request[key])
        })
        .join('&')

    fetch(url + '?' + queryString)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response)
                throw new Error(response.status)
            }
        })
        .then(function(data) {
            let results = []
            let items = data.findCompletedItemsResponse[0].searchResult[0].item

            for(let i = 0; i < items.length; i++) {
				results.push({"Name": items[i].title, "Price": items[i].sellingStatus[0].currentPrice[0].__value__, "Image": items[i].galleryURL})
            }

			fetch(`https://feature-matching.onrender.com?condition=${condition}&start=https://inventory-ai.onrender.com/user-images/${image}`, {
			//fetch(`http://127.0.0.1:5000?condition=${condition}&start=http://localhost:1000/user-images/${image}`, {
					method: "POST",
					body: JSON.stringify(results)
				})
					.then(response => response.json())
					.then(data => {
						res.json({"min": data.min, "max": data.max, "image": req.file.filename})
					})
					.catch(error => console.log(error))
        })
        .catch(function(error) {
            console.log(error.message)
        })
})

app.get("/api/delete-item", async (req, res) => {
    try {
        let identifier = req.query.image.split("/")[req.query.image.split("/").length - 1]
		await client.connect()
		const db = client.db("users")
		let current = await db.collection("people").findOne({"Private": req.query.private})
		if(current) {
            for(let i = 0; i < current.Owns.length; i++) {
                if(current.Owns[i].Image == identifier) {
                    current.Owns.splice(i, 1)
                    break
                }
            }
			await db.collection("people").updateOne({ Private: req.query.private }, { $set: { Owns: current.Owns }})
			res.json({"Code": 200, "Message": "Successfully deleted item from inventory."})
		} else {
			res.json({"Code": 401, "Error": "Unkown private key."})
		}
    } catch(error) {
        console.log(error)
        res.json({"Code": 400, "Error": error})
    }
})

app.get("*", (req, res) => {
	res.json({"Code": 404, "Message": "Page not found."})
})
