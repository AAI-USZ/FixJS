function putInsidePage() {

	if(playerDiv.clientHeight + Number(playerDiv.style.bottom.replace("px","")) > window.innerHeight) {

		playerDiv.style.bottom = (window.innerHeight - playerDiv.clientHeight) + "px";

	}else if(Number(playerDiv.style.bottom.replace("px","")) < 0) {

		playerDiv.style.bottom = "0px";

	}

	if(playerDiv.clientWidth + Number(playerDiv.style.right.replace("px","")) > window.innerWidth) {

		playerDiv.style.right = (window.innerWidth - playerDiv.clientWidth) + "px";

	}else if(Number(playerDiv.style.right.replace("px","")) < 0) {

		playerDiv.style.right = "0px";

	}

}