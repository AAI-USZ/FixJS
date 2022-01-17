function processMessages(messages, html){
	var msgArray = [];
	var document = jsdom.jsdom(html);
	
	for(var msgId in messages){
		var msg = messages[msgId];
		if(isMessage(msg,'sms')){
			msg.thread = [];
			var thread = document.getElementById(msgId).getElementsByClassName('gc-message-sms-row');
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