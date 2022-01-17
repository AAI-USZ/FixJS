function onGenerateButtonClicked(event) {
	try {
		var generatedData = generateAddon();
		window.location.href="data:application/zip;base64," + generatedData;
	} catch(err) {
	}
}