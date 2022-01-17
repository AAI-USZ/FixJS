function(passwordMode) {
		if(this.passwordMode != passwordMode) {
			this.passwordMode = passwordMode;
			try {
				if(this.passwordMode)
					this.entryDrawing.setAttribute('type', 'password');
				else
					this.entryDrawing.setAttribute('type', 'text');
			} catch(exception) {
				// IE < 9 dont support to change type after insert in the DOM
				var clone = this.entryDrawing.cloneNode(false);
				if(this.passwordMode)
					clone.setAttribute('type', 'password');
				else
					clone.setAttribute('type', 'text');
				this.entryDrawing.parentNode.replaceChild(clone, this.entryDrawing);
				this.entryDrawing = clone;
				this.drawing = this.entryDrawing;
				this.invalidateArrange();
			}
		}
	}