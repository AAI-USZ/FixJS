function handle(response) {
	switch(response.action){
		case 'headers':
			log(response.data, 'blue', false);
			break;
		case 'chat':
			var prev = $('#log').html();
			prev = prev.replace(/(<([^>]+)>)/ig,'');
			
			if (prev.substr(0,1) != '['){
				response.data += '<br>';
			}
			
			log(response.data, 'yellow', false);
			break;
		case 'schat':
			var prev = $('#log').html();
			prev = prev.replace(/(<([^>]+)>)/ig,'');
			
			if (prev.substr(0,1) != '['){
				response.data += '<br>';
			}
			
			log(response.data, 'white', false);
			break;
		case 'pm':
			var prev = $('#log').html();
			prev = prev.replace(/(<([^>]+)>)/ig,'');
			
			if (prev.substr(0,1) != '['){
				response.data += '<br>';
			}
			
			log(response.data, 'pink', false);
			break;
		case 'change':
			$('#log').html('')
			break;
		case 'finish':
			function switchScreen() { $('#log').html(''); $('#prompt').val('headers'); $('#command').submit(); }
			setTimeout(switchScreen, 5000);
			break;
		case 'leave':
			hasLeft = true;
			postProcess();
			$('#log').html('');
			break;
		case 'wrong':
			postProcess();
			log(response.data, 'blue', false);
			break;
		case 'display':
			postProcess();
			hasBuzzed = true;
			log(lastQuestion + '<br>', 'purple', false);
			break;
		case 'stats':
			log(response.data, '#00CC66', false);
			break;
		case 'question':
			hasBuzzed = false; hasLeft = false; wordsPos = 0;
			lastQuestion = response.data;
			var words = response.data.split(' ');
			read(words);
			break;
		case 'wait':
			log(response.data, 'blue', false);
			log('Type \'next\' to continue to the next question.<br>Only one user needs to do this; please be considerate.', 'green', false);
			break;
		case 'finWait':
			log(response.data, 'green', false);
			log('Input temporarily disabling.', 'green', false);
			$('#prompt').attr('disabled', true);
			cont = function() { $('#prompt').val('continue'); $('#command').submit();  $('#prompt').removeAttr('disabled'); }
			setTimeout(cont, 15000);
			break;
		default:
			log(response.data, 'blue', false);
			break;
	}
}