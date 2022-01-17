function addLine(msg){
			if (msg.counter==-1) {
				msgClass = 'system';
			} else {
				msgClass = 'user'+msg.counter;
			}
			var mp = $('<p>').addClass(msgClass).css('color', '#'+msg.color).text(msg.line).appendTo('#conversation');
			if (highlightUser==msg.counter) {
				mp.addClass('highlight');
			}
			conversation.scrollTop(conversation[0].scrollHeight);
		}