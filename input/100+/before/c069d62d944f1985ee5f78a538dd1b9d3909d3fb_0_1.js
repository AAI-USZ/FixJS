function(passwordMode) {
		if(this.passwordMode != passwordMode) {
			this.passwordMode = passwordMode;
			try {
				if(this.passwordMode)
					this.entryDrawing.setAttribute('type', 'password');
				else
					this.entryDrawing.setAttribute('type', 'text');
			} catch(exception) {
				var clone = this.entryDrawing.cloneNode(false);
				if(this.passwordMode)
					clone.setAttribute('type', 'password');
				else
					clone.setAttribute('type', 'text');
				this.entryDrawing.parentNode.replaceChild(clone, this.entryDrawing);
				this.entryDrawing = clone;
			}
		}
	}