function(){
			// summary:
			//		it is meant to be called only once
			this.host.onFirstMove(this);
			this.events.pop().remove();
		}