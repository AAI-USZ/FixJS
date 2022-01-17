function(/*Event*/ /*===== e =====*/){
			// summary:
			//		Called when the "previous" button is clicked.
			if(this.currentView){
				this.currentView.goTo(-1);
			}
		}