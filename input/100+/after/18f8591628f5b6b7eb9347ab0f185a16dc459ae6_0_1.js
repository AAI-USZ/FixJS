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
			if (!isWronged){
				postProcess();
				isWronged = true;
				hasAnswered = true;
				isAnswering = false;
				hasBuzzed = false;
				isReading = false;
				log(response.data, 'blue', false);
				$('#prompt').focus();
			}
			break;
		case 'display':
			if (!isDisplayed){
				postProcess();
				isDisplayed = true;
				hasAnswered = true;
				isAnswering = false;
				hasBuzzed = false;
				isReading = false;
				log(lastQuestion + '<br>', 'purple', false);
				$('#prompt').removeAttr('disabled');
			}
			break;
		case 'stats':
			if (!isStat){
				isStat = true;
				log(response.data, '#00CC66', false);
			}
			break;
		case 'question':
			hasBuzzed = false; hasAnswered = false; 
			hasLeft = false; isReading = true; isStat = false;
			isDisplayed = false; isWronged = false;
			wordsPos = 0; lastQuestion = response.data;
			globalWords = response.data.split(' ');
			read(globalWords);
			break;
		case 'read':
			if (!hasAnswered && !isReading && !isAnswering){
				hasBuzzed = false;
				isReading = true;
				$('#buzz').remove();
				$('#prompt').removeAttr('disabled');
				read(globalWords);
			}
			break;
		case 'buzz':
			hasBuzzed = true;
			if (hasAnswered == false)
			{
				isReading = false;
				$('#qs').append('<span id=\'buzz\' style=\'color: yellow;\'>Buzz!! </span>');
				$('#prompt').attr('disabled', true);
			}
			break;
		case 'sbuzz':
			hasBuzzed = true; isReading = false;
			$('#qs').append('<span style=\'color: yellow;\'>Buzz!! </span>'); isAnswering = true;
			function timeOut() { if (hasAnswered == false) { $('#prompt').val('answer'); $('#command').submit(); } }
			setTimeout(timeOut, 9000);
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
			cont = function() { $('#prompt').val('continue'); $('#command').submit(); }
			setTimeout(cont, 5000);
			break;
		default:
			log(response.data, 'blue', false);
			break;
	}
}