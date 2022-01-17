function() {
				this._super();

				// Reset the form using a native call. This will also correctly reset checkboxes and radio buttons.
				this[0].reset();
			}