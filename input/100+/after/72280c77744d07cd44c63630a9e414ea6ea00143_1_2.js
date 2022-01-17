function process() {
	if (nrConected > 0) {
		nrConected = nrConected - 1;
		console.log('Clinet ' + clinetNr + ' has conected ' + (totalNrConected - nrConected) + ' times');
		loadSite(address, process);
	} else {
		runOnAll();
	}
}