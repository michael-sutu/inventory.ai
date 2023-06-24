let currentFrame = 1

function renderFrame(newFrameId) {
	document.getElementById(currentFrame).style.display = "none"
	document.getElementById(newFrameId).style.display = "block"
	currentFrame = newFrameId

	document.querySelectorAll("input").forEach((e) => {
		e.value = ""
		e.className = ""
    if(e.dataset.original !== undefined) {
      e.placeholder = e.dataset.original
    }
	})
}

function displayLoading(visibility) {
	document.querySelector(".loadingFrame").style.display = visibility
}

String.prototype.hash = function() {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return hash
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

function lowercase(string) {
	let split = string.split("")
	let final = ""
	for(let i = 0; i < split.length; i++) {
		final += split[i].toLowerCase()
	}
	return final
}

function clearInputs() {
	document.querySelectorAll(".badInput").forEach((e) => {
		e.className = ""
	})
}

function updateValue() {
  let minValue = 0
	let maxValue = 0
	document.querySelectorAll(".itemDiv").forEach((e) => {
        let values = e.querySelectorAll("p")
        if (values.length == 2) {
          minValue += parseFloat(values[1].textContent.split("-")[0].replace("$", ""))
		      maxValue += parseFloat(values[1].textContent.split("-")[1].replace("$", ""))
        } else {
          minValue += (parseFloat(values[1].textContent.split("-")[0].replace("$", "")) * parseFloat(values[2].textContent.replace("x", "")))
		      maxValue += (parseFloat(values[1].textContent.split("-")[1].replace("$", "")) * parseFloat(values[2].textContent.replace("x", "")))
        }
	})

	document.querySelector(".invValue").textContent = `$${minValue.toFixed(2)} - $${maxValue.toFixed(2)}`
}

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}
