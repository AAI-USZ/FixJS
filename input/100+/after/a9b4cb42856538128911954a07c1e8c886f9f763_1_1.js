function (from, to, msg, timestamp) {
		var dataString = 'from=' + from + '&to=' + to + '&msg=' + msg + '&timestamp=' + timestamp;
		jQuery.ajax({
			type: "POST",
			url: "ATutor/mods/chat_new/ajax/new_message.php",
			data: dataString,
			cache: false,
			success: function (returned) {
				if (returned != 1) {
					console.log('An error while saving message into database occured.');
				}
			},
			error: function (xhr, errorType, exception) {
			    console.log("error: " + exception);
			}		
		});
	}