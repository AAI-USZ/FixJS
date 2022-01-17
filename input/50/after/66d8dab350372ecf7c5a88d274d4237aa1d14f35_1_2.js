function (jid_id) {
		var div = jQuery('#chat_' + jid_id + ' .chat_messages').get(0);
		div.scrollTop = div.scrollHeight;
	}