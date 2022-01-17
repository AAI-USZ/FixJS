function(e){

				if(!this.scrollingLocked){

		    		switch(e.type) {

						case 'touchstart': 

							this.preventHideRefresh = !this.refreshRunning; // if it's not running why prevent it xD

							this.moved = false;

							this.onTouchStart(e); 

						break;

						case 'touchmove': this.onTouchMove(e); break;

						case 'touchend': this.onTouchEnd(e); break;

						case 'scroll': this.onScroll(e); break;

		    		}

				}

			}