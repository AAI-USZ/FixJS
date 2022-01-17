function(e) {
		if (e.success) {
			for (var i = 0; i < e.chats.length; i++) {
				var chat = e.chats[i];
				alert('Success:\\n' + 'From: ' + chat.from.first_name + ' ' + chat.from.last_name + '\\n' + 'Updated: ' + chat.updated_at + '\\n' + 'Message: ' + chat.message);
			}
		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	}