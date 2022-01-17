function display(message) {
	switch(message.action){
		case 'nick':
			log('Nickname change request sent.<br>', 'green', true);
			break;
		case 'chat':
			break;
		case 'pm':
			break;
		case 'game':
			log('New game request sent.<br>', 'green', true);
			break;
		case 'join':
			log('Game join request sent.<br>', 'green', true);
			break;	
		case 'leave':
			log('Leave request sent.<br>', 'green', true);
			break;
		case 'start':
			log('Start request sent.<br>', 'green', true);
			break;
		case 'ping':
			log('Ping request sent.<br>', 'green', true);
			break;
		case 'help':
			log('Help request sent.<br>', 'green', true);
			break;
		case 'status':
			log('Status request sent.<br>', 'green', true);
			break;
		case 'headers':
			log('Header request sent.<br>', 'green', true);
			break;
		case 'list':
			log('List request sent.<br>', 'green', true);
			break;
		case 'continue':
			break;
		case 'next':
			break;
		case 'skip':
			break;
		case 'buzz':
			break;
		case 'answer':
			break;
		default:
			var data = message.data
			if (data != '') { log('Command: ' + message.action + ' ' + data.join(' ') + '<br>', 'green', true); }
			else { log('Command: ' + message.action + '<br>', 'green', true); }
			break;
	}
}