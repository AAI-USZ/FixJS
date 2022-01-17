function onConnectionChange(state) {
		var errorMessages = {
			failed: 'Syncing support unavailable for this device.',
			disconnected: 'Connection lost! Will try again momentarily...'
		};
		// if the state change has caused an error, display a message
		// and disable syncing across the presentation
		if (state.current in errorMessages) {
			setSyncing(false, false);
			alert(errorMessages[event.current]);

		// otherwise, re-enable syncing and hide any alerts.
		} else if (state.current === 'connected') {
			setSyncing(true, true);
			alert(false);
		}
	}