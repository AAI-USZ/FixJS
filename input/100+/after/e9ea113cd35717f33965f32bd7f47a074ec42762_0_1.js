function(error, stdout, stderr) {
			if (error && stderr) {
				socket.emit('console', '/modlog errored, tell Zarel or bmelts.');
				console.log('/modlog error: '+error);
				return false;
			}
			if (lines) {
				if (!stdout) {
					socket.emit('console', 'The modlog is empty. (Weird.)');
				} else {
					socket.emit('message', 'Displaying the last '+lines+' lines of the Moderator Log:\n\n'+stdout);
				}
			} else {
				if (!stdout) {
					socket.emit('console', 'No moderator actions containing "'+target+'" were found.');
				} else {
					socket.emit('message', 'Displaying all logged actions containing "'+target+'":\n\n'+stdout);
				}
			}
		}