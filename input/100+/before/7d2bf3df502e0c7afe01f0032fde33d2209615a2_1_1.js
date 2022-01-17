function (message, xhr, errorElementId) {
		var errorMsg, status, e = null;
		errorMsg = message;
		status = xhr.status;
		try {
			e = $.parseJSON(xhr.responseText);
		} catch (exc) {
			console.log('Failed to parse JSON:', exc);
		}

		console.log(xhr, xhr.responseText, status);
		if (e) {
			errorMsg = "<strong>Error " + status + "</strong><br>";
			errorMsg += message + ": " + e.message;
		} else {
			errorMsg = "Could not connect to server";
		}
		if (status === 0 || status === 401 || status === 503) {
			if (errorElementId) {
				$('#' + errorElementId).html(errorMsg).show();
			} else {
				wsl.fatalError(errorMsg);
			}
		} else {
			if (errorElementId) {
				$('#' + errorElementId).html(errorMsg).show();
			} else {
				wsl.error(errorMsg);
			}
			if (wsl.pageLoaded === false) {
				wsl.displayArtists();
			}
		}
	}