function(data) {
		var callbackLoc = document.getElementById("update-callback");
		if( callbackLoc ) {
			var total = data.update.installNeeds - data.update.storageNeeds;
			callbackLoc.innerHTML = callbackLoc.innerText = data.bytesDownloaded+"/"+total;
		}
	}