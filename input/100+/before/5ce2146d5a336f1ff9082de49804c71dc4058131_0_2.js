function () {
		var msg = 'Do you really want to shutdown the server?<br>';
		msg += 'You will not be able to login util you restart the server manually!';
		wsl.confirmDialog('Shutdown server', msg, function () {
			wsl.lockUI();
			$.ajax({
				url : "wissl/shutdown",
				type : 'POST',
				headers : {
					'sessionId' : wsl.sessionId
				},
				success : function () {
					// will never be a success
				},
				error : function (xhr, textStatus, errorThrown) {
					wsl.ajaxError("Shutdown failure", xhr);
					wsl.unlockUI();
				}
			});
		}, function () {
		});
	}