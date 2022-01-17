function() {
				this._attributes = {};
				this.delete_();
				this.fireEvent('destroy');
			}