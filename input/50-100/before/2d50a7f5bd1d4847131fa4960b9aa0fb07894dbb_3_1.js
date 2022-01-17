function(e) {
	if(typeBarcodeTextField.value.length == 13) {
		Ti.UI.Android.hideSoftKeyboard();
		sellingDetailsWin.isbnNo = typeBarcodeTextField.value;
		sellingDetailsWin.image = imgView;
		sellingDetailsWin.open();
	} else {
		alert('Invalid isbn number. Check that the isbn number is 13 digit long. And remove all \'-\'')
	}
}