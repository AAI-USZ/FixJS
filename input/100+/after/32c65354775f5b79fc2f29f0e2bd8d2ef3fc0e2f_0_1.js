function (input) {
		Logger.userLog('user		', input.trim());

		switch (input.trim()) {
			case 'exit':
				Cassidie.exit();
				break;
			case 'status':
				Cassidie.showStatus();
				break;
			case 'clients':
				Cassidie.showClients();
				break;
			case 'game':
				Cassidie.showGame();
				break;
			case 'reset':
				Cassidie.reset();
				break;
			case 'debugio':
				Cassidie.netConnection.manager.set('log level', 3);
				break;
			case 'mute':
				Cassidie.netConnection.manager.set('log level', 0);
				break;
		}
	}