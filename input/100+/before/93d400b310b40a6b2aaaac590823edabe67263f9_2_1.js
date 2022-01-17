function(e){
			e.preventDefault();
			
			// jquery wraps the native event, need it for e.touches though
			var ev = this.getTouch(e);

			var handle = closest('span', e.target);
			var play = this.play;

			// store some vectors (see further below) for move calcs
			this.center = new Vector(
				play.offsetLeft + play.offsetWidth / 2, 
				play.offsetTop + play.offsetHeight / 2
			);

			this.anchor = new Vector(ev.clientX, ev.clientY);			
			this.offset = this.anchor.subtract(this.center);

			this.mode = handle.className;
		}