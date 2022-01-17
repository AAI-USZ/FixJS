function keyPressed(event) {
	event.preventDefault(); // freaking dumb firefox quickfind bull.
	var key = event.which;
	
	var nvel1 = vel1, nvel2 = vel2;
	
	if (key == 'e'.charCodeAt()) {
		firstPerson = !firstPerson;
	} else if (key == ' '.charCodeAt()) {
		console.log("STOP!!!");
		nvel1 = nvel2 = 0;
		lineFollowerOn = wallFollowerOn = customOn = false;
	} else if(key == 'z'.charCodeAt() && !wallFollowerOn && !customOn) {
		lineFollowerOn = !lineFollowerOn;
		if (!lineFollowerOn) nvel1 = nvel2 = 0;
	} else if(key == 'x'.charCodeAt() && !lineFollowerOn && !customOn) {
		wallFollowerOn = !wallFollowerOn;
		if (!wallFollowerOn) nvel1 = nvel2 = 0;
	} else if(key == 'c'.charCodeAt() && !lineFollowerOn && !wallFollowerOn) {
		customOn = !customOn;
		if (!customOn) nvel1 = nvel2 = 0;
		else cp_main();
	} else if(key == 'q'.charCodeAt()) {
		pf_state = pf_state+1;
		if (pf_state == 3) pf_state = 0;
	} else if(lineFollowerOn || wallFollowerOn || customOn) {
		// grabbing the input so the normal control don't mess
		//	with the programs.
	} else if(key == 'w'.charCodeAt()) {
		nvel1 = vel1+V_INC;
		nvel2 = vel2+V_INC;
		if (nvel1 > VEL_MAX)
			nvel1 = VEL_MAX;
		if (nvel2 > VEL_MAX)
			nvel2 = VEL_MAX;
	} else if (key == 'a'.charCodeAt()) {
		nvel1 = vel1+V_INC;
		nvel2 = vel2-V_INC;
		if (nvel1 > VEL_MAX)
			nvel1 = VEL_MAX;
		if (nvel2 < -VEL_MAX)
			nvel2 = -VEL_MAX;
	} else if (key == 's'.charCodeAt()) {
		nvel1 = vel1-V_INC;
		nvel2 = vel2-V_INC;
		if (nvel1 < -VEL_MAX)
			nvel1 = -VEL_MAX;
		if (nvel2 < -VEL_MAX)
			nvel2 = -VEL_MAX;
	} else if (key == 'd'.charCodeAt()) {
		nvel1 = vel1-V_INC;
		nvel2 = vel2+V_INC;
		if (nvel1 < -VEL_MAX)
			nvel1 = -VEL_MAX;
		if (nvel2 > VEL_MAX)
			nvel2 = VEL_MAX;
	} 
	
	vel1 = nvel1;
	vel2 = nvel2;
}