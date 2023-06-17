let userData = {}

if(screen.width > 480) {
	renderFrame("0")
} else {
	if(localStorage.getItem("Private")) {
		renderFrame("4")
		displayLoading("block")
		fetch(`/api/account?type=get&private=${localStorage.getItem("Private")}`)
			.then(response => response.json())
			.then(data => {
				if(data.Code == 200) {
					userData = data.Data
					document.getElementById("emailDisplay").textContent = userData.Email
					for(let i = 0; i < userData.Owns.length; i++) {
						if(document.querySelector(".emptyMsg")) {
							document.querySelector(".emptyMsg").remove()
						}
						let newItem = document.createElement("div")
						newItem.className = "itemDiv"
						let itemImg = document.createElement("img")
						itemImg.src = "https://inventoryai.michael8910.repl.co/user-images/"+userData.Owns[i].Image
						newItem.appendChild(itemImg)
						let itemName = document.createElement("p")
						itemName.textContent = userData.Owns[i].Name
						newItem.appendChild(itemName)
						let itemValue = document.createElement("p")
						itemValue.textContent = "$"+userData.Owns[i].Value
						newItem.appendChild(itemValue)
		
						document.querySelector(".itemContainer").appendChild(newItem)
						document.querySelector(".bottomSpace").remove()
						document.querySelector(".itemContainer").innerHTML += `<div class="bottomSpace" style="margin-bottom: 40vw;"></div>`
						updateValue()
					}
					if(document.querySelector(".itemDiv")) {
						document.querySelectorAll(".itemDiv").forEach((e) => {
							e.addEventListener("click", (e) => {
								if(e.target.className == ".itemDiv") {
									document.querySelector(".selectedImg").src = e.target.querySelector("img").src
									document.querySelector(".selectedName").textContent = e.target.querySelectorAll("p")[0].textContent
									document.querySelector(".selectedValue").textContent = e.target.querySelectorAll("p")[1].textContent
								} else {
									document.querySelector(".selectedImg").src = e.target.parentElement.querySelector("img").src
									document.querySelector(".selectedName").textContent = e.target.parentElement.querySelectorAll("p")[0].textContent
									document.querySelector(".selectedValue").textContent = e.target.parentElement.querySelectorAll("p")[1].textContent
								}
								renderFrame("10")
							})
						})
					}
					displayLoading("none")
				} else if(data.Code == 401) {
					localStorage.removeItem("Private")
					location.reload()
				} else {
					displayLoading("none")
					alert(JSON.stringify(data.Error))
				}
			})
	} else {
		renderFrame("1")
	}
}

document.querySelectorAll("*").forEach((btn) => {
	if(btn.dataset.direct !== undefined) {
		btn.addEventListener("click", (e) => {
			renderFrame(btn.dataset.direct)
		})
	}
})

document.getElementById("signUpBtn").addEventListener("click", (e) => {
	clearInputs()
	displayLoading("block")
	if(validateEmail(document.getElementById("emailInput").value)) {
		if(document.getElementById("passwordInput").value.split("").length > 5) {
			fetch(`/api/account?type=new&email=${lowercase(document.getElementById("emailInput").value)}&password=${document.getElementById("passwordInput").value.hash()}`)
				.then(response => response.json())
				.then(data => {
					if(data.Code == 200) {
						localStorage.setItem("Private", data.Private)
						location.reload()
					} else if(data.Code == 401) {
						displayLoading("none")
						document.getElementById("emailInput").placeholder = "Email - Taken"
						document.getElementById("emailInput").classList.add('badInput')
						document.getElementById("emailInput").value = ""
					} else {
						displayLoading("none")
						alert(JSON.stringify(data.Error))
					}
				})
		} else {
			displayLoading("none")
			document.getElementById("passwordInput").placeholder = "Password - Too Short"
			document.getElementById("passwordInput").classList.add('badInput')
			document.getElementById("passwordInput").value = ""
		}
	} else {
		displayLoading("none")
		document.getElementById("emailInput").placeholder = "Email - Invalid Format"
		document.getElementById("emailInput").classList.add('badInput')
		document.getElementById("emailInput").value = ""
	}
})

document.getElementById("loginBtn").addEventListener("click", (e) => {
	clearInputs()
	displayLoading("block")
	fetch(`/api/account?type=login&email=${lowercase(document.getElementById("loginEmailInput").value)}&password=${document.getElementById("loginPasswordInput").value.hash()}`)
		.then(response => response.json())
		.then(data => {
			displayLoading("none")
			if(data.Code == 200) {
				localStorage.setItem("Private", data.Private)
				location.reload()
			} else if(data.Code == 401.1) {
				displayLoading("none")
				document.getElementById("loginEmailInput").placeholder = "Email - Unkown Email"
				document.getElementById("loginEmailInput").classList.add('badInput')
				document.getElementById("loginEmailInput").value = ""
			} else if(data.Code == 401.2) {
				displayLoading("none")
				document.getElementById("loginPasswordInput").placeholder = "Password - Incorrect"
				document.getElementById("loginPasswordInput").classList.add('badInput')
				document.getElementById("loginPasswordInput").value = ""
			} else {
				displayLoading("none")
				alert(JSON.stringify(data.Error))
			}
		})
})

document.getElementById("logoutBtn").addEventListener("click", (e) => {
	displayLoading("block")
	localStorage.removeItem("Private")
	location.reload()
})

async function setupCamera() {
  video = document.getElementById('video')

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'environment',
      height: 500,
      width: 500,
    },
  })
	
	document.querySelector(".videoLoad").style.display = "none"
  video.srcObject = stream
	document.querySelectorAll(".streamCloser").forEach((e) => {
		e.addEventListener("click", (e) => {
			imageRef = document.querySelector("canvas").toDataURL("image/png")

			let data = atob( imageRef.substring( "data:image/png;base64,".length ) ),
    	asArray = new Uint8Array(data.length);
			for( let i = 0, len = data.length; i < len; ++i ) {
    		asArray[i] = data.charCodeAt(i);    
			}
			imageBlob = new Blob( [ asArray.buffer ], {type: "image/png"} );
			
			document.querySelector(".finalizeImg").src = imageRef
			stream.getTracks().forEach(function(track) {
  			track.stop()
				document.querySelector(".videoLoad").style.display = "block"
			})
		})
	})
    
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video)
    }
	})
}

function drawWebcamContinuous(){
  ctx.drawImage(video, 0, 0)
  requestAnimationFrame(drawWebcamContinuous)
}

let canvas
let ctx
let imageRef
let imageBlob

async function camera() {
  await setupCamera();
  video.play()

  canvas = document.querySelector('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  ctx = canvas.getContext('2d')
  
  drawWebcamContinuous()
}

document.querySelector(".addBtn").addEventListener("click", (e) => {
	camera()
})

setInterval((e) => {
	document.querySelector(".condition").textContent = "Condition - "+document.getElementById("conditionInput").value	
}, 100)

/*
document.querySelector(".finalAddBtn").addEventListener("click", async (e) => {
	let pass = true
	let valueInput = document.getElementById("valueInput")
	let nameInput = document.getElementById("nameInput")
	valueInput.class = ""
	nameInput.class = ""
	valueInput.placeholder = "Value"
	nameInput.placeholder = "Name"
	
	if(valueInput.value.split("").length == 0) {
		valueInput.classList.add("badInput")
		valueInput.value = ""
		valueInput.placeholder = "Value - Feild Required"
		pass = false
	}

	if(nameInput.value.split("").length == 0) {
		nameInput.classList.add("badInput")
		nameInput.value = ""
		nameInput.placeholder = "Name - Feild Required"
		pass = false
	}

	if(pass) {
		if(document.querySelector(".emptyMsg")) {
			document.querySelector(".emptyMsg").remove()
		}

		let fd = new FormData()
		fd.append('upl', imageBlob, 'test.png')
		fetch(`https://inventoryai.michael8910.repl.co/api/inventory?type=new&private=${localStorage.getItem("Private")}&name=${nameInput.value}&value=${valueInput.value}`, {
            method: "POST",
            body: fd
        })
		
		let newItem = document.createElement("div")
		newItem.className = "itemDiv"
		let itemImg = document.createElement("img")
		itemImg.src = imageRef
		newItem.appendChild(itemImg)
		let itemName = document.createElement("p")
		itemName.textContent = nameInput.value
		newItem.appendChild(itemName)
		let itemValue = document.createElement("p")
		itemValue.textContent = "$"+valueInput.value
		newItem.appendChild(itemValue)
		
		document.querySelector(".itemContainer").appendChild(newItem)
		document.querySelector(".bottomSpace").remove()
		document.querySelector(".itemContainer").innerHTML += `<div class="bottomSpace" style="margin-bottom: 40vw;"></div>`
		updateValue()
		
		renderFrame("4")
	}
})
*/