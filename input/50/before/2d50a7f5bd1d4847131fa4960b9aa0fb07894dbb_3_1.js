function() {
	var bacodeScanningWin = Titanium.UI.createWindow({
		backgroundColor : '#FFFFFF',
		url : 'barcodeScanner.js',
		image: imgView.image
	});

	//bacodeScanningWin.image = imgView.image;
	bacodeScanningWin.open();
}