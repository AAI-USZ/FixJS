function(){
			// summary:
			//		Shows drop-down if the user is selecting Next/Previous from the virtual keyboard.
			// tags:
			//		private
			this.inherited(arguments);
			if(!this._opened && !this._throttleHandler){
				this._startSearchAll(); 
			}
		}