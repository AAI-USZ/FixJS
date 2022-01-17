function documentMouseMove(e) {

	if(e.target == playerHeader){

	e.preventDefault();

	}

	if(playerHeader.down) {

		var cr = Number(playerDiv.style.right.replace("px",""))

		var cb = Number(playerDiv.style.bottom.replace("px",""))

		playerDiv.style.right = (cr + playerHeader.oldx - e.clientX) + "px";

		playerDiv.style.bottom = (cb + playerHeader.oldy - e.clientY) + "px";

		playerHeader.oldx = e.clientX;

		playerHeader.oldy = e.clientY;

	}

}