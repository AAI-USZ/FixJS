function (from, to, msg, timestamp) {		
		var dataString = 'from=' + from + '&to=' + to + '&msg=' + msg + '&timestamp=' + timestamp;
		jQuery.ajax({
			type: "POST",
			url: "ATutor/mods/chat_new/ajax/new_message.php",
			data: dataString,
			cache: false,
			success: function (returned) {
				console.log(returned);
			},
			error: function (xhr, errorType, exception) {
			    console.log("error: " + exception);
			}		
		});
	}