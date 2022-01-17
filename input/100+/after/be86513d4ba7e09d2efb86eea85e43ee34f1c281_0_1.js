function processMessages(messages, html){
	var msgArray = [];
	var document = jsdom.jsdom(html);
	
	for(var msgId in messages){
		var msg = messages[msgId];
		var msgHtml = document.getElementById(msgId);
		msg.location = msgHtml.getElementsByClassName('gc-message-location');
		if(msg.location[0]) {
			var loc = msg.location[0].getElementsByClassName('gc-under')[0];
			msg.location = (loc && loc.innerHTML) || "";
		} else {
			msg.location = "";
		}
		var thread = msgHtml.getElementsByClassName('gc-message-sms-row');
		if(thread.length > 0) {
			msg.thread = [];
			thread.forEach = Array.prototype.forEach;
			thread.forEach(function(text){
				msg.thread.push({
					time: getField('time', text),
					from: getField('from', text),
					text: getField('text', text)
				});
			});
		}
		if(isMessage(msg,'voicemail') || isMessage(msg,'recorded')){
			msg.url = voicemailMp3BaseUrl + msgId;
		}
		
		msgArray.push(msg);
	}
	return msgArray;
}