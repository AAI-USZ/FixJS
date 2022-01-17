function(anEvent) {
		if (false === this.triggerDelegateCall('shouldCloseEditInPlace', true, anEvent))
			return;
		
		var enteredText = this.dom.find(':input').val();
		enteredText = this.triggerDelegateCall('willCloseEditInPlace', enteredText);
		
		if (this.isDisabledDefaultSelectChoice()
			|| this.isUnchangedInput(enteredText)) {
			this.handleCancelEditor(anEvent);
			return;
		}
		
		if (this.didForgetRequiredText(enteredText)) {
			this.handleCancelEditor(anEvent);
			this.reportError("Error: You must enter a value to save this field");
			return;
		}
		
		//this.showSaving(enteredText);
		this.handleSubmitToServer(enteredText);
			
	}