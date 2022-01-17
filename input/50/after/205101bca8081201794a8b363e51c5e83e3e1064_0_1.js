function(){
			// summary:
			//		Despite the name of this method, it actually handles both mouseleave and blur
			//		events on the target node, hiding the tooltip.
			// tags:
			//		private

			if(this._showTimer){
				this._showTimer.remove();
				delete this._showTimer;
			}
			this.close();
		}