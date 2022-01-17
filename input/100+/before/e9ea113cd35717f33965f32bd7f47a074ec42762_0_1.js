function(error, stdout, stderr) {
			if (error !== null) {
				socket.emit('console', '/modlog errored, tell Zarel or bmelts.');
				console.log('/modlog error: '+error+'\n'+stderr);
				return false;
			}
			socket.emit('message', 'Displaying the last '+lines+' lines of the Moderator Log:\n\n'+stdout);
		}