function(title, body, callback, buttonTitle) {
	
		// construct a modal dialogue definition for a first-run dialogue.
		var dialogueDefinition = {
			title : title,
			body : body,
			animate: {
				animateIn : 'slideInTop',
				animateOut : 'fadeOut'
			},
			form : this.defaultDefinitions.connection.call(this).form
		}
		
		// refresh the host and port settings.
		dialogueDefinition.form.inputs[0].placeholder = this.settings.get('host') || 'localhost'
		dialogueDefinition.form.inputs[1].placeholder = this.settings.get('port') || 6232
		
		// overload the default callback method.
		dialogueDefinition.form.callback = callback
		
		// set the submit button text.
		dialogueDefinition.form.buttonTitle = buttonTitle
		
		// present the dialogue.
		this.dialogueId = dialogue.createSingle(dialogueDefinition)
	}