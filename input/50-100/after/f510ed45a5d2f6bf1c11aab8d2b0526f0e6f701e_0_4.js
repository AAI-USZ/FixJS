function (firstExecution) {

			if(this.eventsActive) return;

			this.eventsActive = true;

			if(!firstExecution) this.adjustScroll();

			//add listeners

    		this.container.addEventListener('touchstart', this, false);

            this.container.addEventListener('touchmove', this, false);

			this.container.addEventListener('touchend', this, false);

			

        }