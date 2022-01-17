function () {

			if(!this.eventsActive) return;

			//log top/left

			var cssMatrix = this.getCSSMatrix(this.el);

            this.loggedY = numOnly(cssMatrix.f) - numOnly(this.container.scrollTop);

            this.loggedX = numOnly(cssMatrix.e) - numOnly(this.container.scrollLeft);

			//remove event listeners

        	this.container.removeEventListener('touchstart', this, false);

            this.container.removeEventListener('touchmove', this, false);

			this.container.removeEventListener('touchend', this, false);

			this.eventsActive = false;

        }