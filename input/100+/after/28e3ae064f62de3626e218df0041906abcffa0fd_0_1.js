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

			if (action == 'answer')
			{
				$('#prompt').val('');
				return false;
			}
			
			if (action == 'buzz')
			{
				if (hasAnswered)
				{
					$('#prompt').val('');
					return false;
				}
			}
			
			if (action == 'continue')
			{
				if (!isFinWaited)
				{
					$('#prompt').val('');
					return false;
				}
			}
			
			if (isAnswering)
			{
				action = 'answer';
				data = typed;
				data = data.split(' ');
				data.push(wordsPos.toString());
				isAnswering = false;
			}
			
			msg.data = data;
			msg.action = action;
			$('#prompt').val('');
			
			socket.send(JSON.stringify(msg));
			display(msg);
		}
	}