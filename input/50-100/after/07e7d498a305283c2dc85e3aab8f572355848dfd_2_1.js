function(jqXHR, textStatus, errorThrown) {
				if (jqXHR.status == 403) {
					alert(__('info session expired'));
					location.reload();
				} else {
					alert(__("Error")  + ": "+ textStatus + " (" + errorThrown + ")");
					console.log(jqXHR.responseText);
				}
			}