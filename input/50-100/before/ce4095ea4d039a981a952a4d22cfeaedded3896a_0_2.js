function() {

	if(localStorage.length !== 0) {
		tBrack.repopulate();
	} else {
		console.log('localStorage is empty');
	}

	tBrack.addPlayer();
	tBrack.removePlayer();
	tBrack.formTricks();
	tBrack.thePlayerList();

}