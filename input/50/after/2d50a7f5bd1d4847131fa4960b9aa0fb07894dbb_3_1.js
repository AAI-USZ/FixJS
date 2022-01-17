function() {
	var bacodeScanningWin = Titanium.UI.createWindow({
		backgroundColor : '#FFFFFF',
		url : 'barcodeScanner.js',
		originalImage: imgView.image
	});

	bacodeScanningWin.open();
}