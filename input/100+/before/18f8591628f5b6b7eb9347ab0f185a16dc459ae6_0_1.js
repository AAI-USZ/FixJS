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
		case 'achat':
			var prev = $('#log').html();
			prev = prev.replace(/(<([^>]+)>)/ig,'');
			
			if (prev.substr(0,1) != '['){
				response.data += '<br>';
			}
			
			log(response.data, '#00F400', false);
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
			hasAnswered = true;
			log(response.data, 'blue', false);
			$('#prompt').focus();
			break;
		case 'display':
			postProcess();
			$('#prompt').removeAttr('disabled');
			hasAnswered = true;
			hasBuzzed = true;
			log(lastQuestion + '<br>', 'purple', false);
			break;
		case 'stats':
			log(response.data, '#00CC66', false);
			break;
		case 'question':
			hasBuzzed = false; hasLeft = false; hasAnswered = false; 
			wordsPos = 0;
			lastQuestion = response.data;
			words = response.data.split(' ');
			read(words);
			break;
		case 'read':
			hasBuzzed = false;
			$('#buzz').remove();
			$('#prompt').removeAttr('disabled');
			read(words);
			break;
		case 'buzz':
			hasBuzzed = true;
			$('#qs').append('<span id=\'buzz\' style=\'color: yellow;\'>Buzz!! </span>');
			$('#prompt').attr('disabled', true);
			break;
		case 'sbuzz':
			hasBuzzed = true;
			$('#qs').append('<span style=\'color: yellow;\'>Buzz!! </span>'); isAnswering = true;
			function timeOut() { if (hasAnswered == false) { $('#prompt').val('answer'); $('#command').submit(); } }
			setTimeout(timeOut, 5000);
			break;
		case 'wait':
			log(response.data, 'blue', false);
			var nextText = 'Type \'next\' to continue to the next question.<br>Only one user needs to do this; please be considerate.<br>';
			nextText = nextText + 'You are guaranteed two minutes of wait time.';
			log(nextText, 'green', false);
			break;
		case 'finWait':
			log(response.data, 'green', false);
			log('Input temporarily disabling.', 'green', false);
			$('#prompt').attr('disabled', true);
			cont = function() { $('#prompt').val('continue'); $('#command').submit();  $('#prompt').removeAttr('disabled'); }
			setTimeout(cont, 5000);
			break;
		default:
			log(response.data, 'blue', false);
			break;
	}
}