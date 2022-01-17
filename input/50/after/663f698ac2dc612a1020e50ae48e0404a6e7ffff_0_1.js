function() {
				this._attributes = {};
				this.delete();
				this.fireEvent('destroy');
			}