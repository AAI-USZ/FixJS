function() {
		if(this.addEventListener)
			this.addEventListener('keydown', tabKeyHandler, false);
		else if(this.attachEvent)
			this.attachEvent('onkeydown', tabKeyHandler);
	}