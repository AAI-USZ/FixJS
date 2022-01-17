function processMessages(messages, html){
	var	msgArray = [];	
	for(var msgId in messages){
		var msg = messages[msgId];
		if(msg.type==10 || msg.type==11){ // an sms
			var document = document || jsdom.jsdom(html);
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
		msgArray.push(msg);
	}
	return msgArray;
}