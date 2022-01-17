function(/*Boolean*/ focus){
			// summary:
			//		Closes the drop down on this widget
			// focus:
			//		If true, refocuses the button widget
			// tags:
			//		protected

			if(this._focusDropDownTimer){
				this._focusDropDownTimer.remove();
				delete this._focusDropDownTimer;
			}
			if(this._opened){
				if(focus){ this.focus(); }
				popup.close(this.dropDown);
				this._opened = false;
			}
		}