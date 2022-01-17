function(/*Number*/ newMonth){
			// summary:
			//		Handler for when user selects a month from the drop down list
			// tags:
			//		protected

			// move to selected month, bounding by the number of days in the month
			// (ex: dec 31 --> jan 28, not jan 31)
			this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus, "month",
				newMonth - this.currentFocus.getMonth()));
		}