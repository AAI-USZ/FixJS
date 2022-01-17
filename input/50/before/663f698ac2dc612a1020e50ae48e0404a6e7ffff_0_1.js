function() {
				this._attributes = {};
				this.fireEvent('destroy');
				//todo: remove model from any collections it may be a member of.
			}