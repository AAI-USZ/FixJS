function vibeApiDidThrowError(err) {

		// stop the throbber.
		if ( modal.hasDialogue(throbberID) ) {
			modal.close(throbberID)
		}
	
		// if this is the first time Vibe has been run
		// then show a welcome dialogue with options
		// for configuring the host and port.
		if ( ! settings.get('host') && ! settings.get('port') ) {

			connectionAssistantId = settingsAssistant.presentConnectionAssistant(
				"Welcome to Vibe!",
				
				"<p>Before you can use Vibe, the address of your Vibe Server must be specified.</p><p>You can find the address of your Vibe Server by looking in its main window, where the address will be specified in the format of: hostname:portnumber.</p>",
				
				connectionAssistantHandler,
				
				"Go"
			)
		}
		
		// if this is a connection error, show a dialogue
		// advising the user to check their settings, with
		// the option of changing their host and port.
		else {
		
			connectionAssistantId = settingsAssistant.presentConnectionAssistant(
				"Vibe failed to connect.",
				
				"<p>We could not connect to the Vibe Server at http://" + settings.get('host') + ':' + settings.get('port') + ", please check that this server is up, or if you have incorrectly entered the details you can change them below. When you're done just press reconnect.</p>",
				
				connectionAssistantHandler,
				
				"Reconnect"
			)
		}
	}