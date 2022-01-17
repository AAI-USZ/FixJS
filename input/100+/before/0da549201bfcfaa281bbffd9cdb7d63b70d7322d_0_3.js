function() {
		var typed = $('#prompt').val();
		if (typed.replace(/\s/g, '') != ''){
			var msg = new Object();
			
			var action = typed;
			action = action.split(' ');
			action = action[0];
			action = action.toLowerCase();
			
			var data = typed
			data = data.split(' ');
			data.shift();

			if (action == 'buzz')
			{
				hasBuzzed = true;
				data.push(wordsPos.toString());
			}
			
			msg.data = data;
			msg.action = action;
			$('#prompt').val('');
			
			socket.send(JSON.stringify(msg));
			display(msg);
		}
	}