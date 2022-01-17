function(data) {
		if (data && data.barcode) {
			var label = Titanium.UI.createLabel({
				text : data.barcode,
			});
			
			sellingDetailsWin.isbnNo = data.barcode;
			sellingDetailsWin.image = imageTaken;
			sellingDetailsWin.open();

		} else {
			alert(JSON.stringify(data));
		}
	}