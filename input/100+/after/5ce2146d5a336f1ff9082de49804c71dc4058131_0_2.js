function () {
		wsl.lockUI();
		$.ajax({
			url : 'wissl/indexer/rescan',
			type : 'POST',
			headers : {
				'sessionId' : wsl.sessionId
			},
			success : function () {
				wsl.unlockUI();
				wsl.displayAdmin();
			},
			error : function (xhr, textStatus, errorThrown) {
				wsl.ajaxError("Rescan folders failed", xhr);
				wsl.unlockUI();
			}
		});
	}