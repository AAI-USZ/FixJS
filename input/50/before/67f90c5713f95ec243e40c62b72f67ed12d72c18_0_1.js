function vibeApiDidDisconnect() {
	
		// tell interface elements that connection to the server has been lost.
		initialiser.alertInterfaceToDisconnection()
		
		settingsAssistant.presentConnectionAssistant(
			"Vibe lost connection to the server.",
			
			"<p>Connection to the Vibe Server has been lost, please check your connection to the Internet has not been terminated and that your Vibe Server has not been turned off.</p><p>If your connection settings need to be adjusted, please change them below and press Reconnect.</p><p>Note: Once connection is restored this dialogue will automatically close.</p>",
			
			connectionAssistantHandler,
			
			"Reconnect"
		)
	}