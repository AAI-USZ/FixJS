function() {
		var h = (this.target.offsetHeight * this.tracker.offsetHeight) / this.target.scrollHeight;
		var w = (this.target.offsetWidth * this.tracker.offsetWidth) / this.target.scrollWidth;
		
		this.ratio = {
			x:(this.target.scrollWidth - this.target.offsetWidth) / (this.tracker.offsetWidth - this.scrub.offsetWidth),
			y:(this.target.scrollHeight - this.target.offsetHeight) / (this.tracker.offsetHeight - this.scrub.offsetHeight)
		};
		
		if(this.args.axis === "y") {
			if(this.args.handle === undefined || this.args.handle === 'auto') {
				this.scrub.style.height = h + "px";
			}
			
			if(this.tracker.offsetHeight >= this.target.scrollHeight) {
				this.scrollbar.style.visibility = "hidden";
			} else {
				this.scrollbar.style.visibility = "visible";
			}
			
			this.tracker.style.height = this.target.offsetHeight + "px";
			
			
			if(this.target.scrollHeight > this.scrollHeight) {
				var pct = (-this.target.scrollTop / (-this.target.scrollHeight + this.target.offsetHeight));
				this.scroll(0, pct * (this.tracker.offsetHeight - this.scrub.offsetHeight));
			}
			
			
		} else {
			if(this.args.handle === undefined || this.args.handle === 'auto') {
				this.scrub.style.width = w + "px";
			}
			
			if(this.tracker.offsetWidth >= this.target.scrollWidth) {
				this.scrollbar.style.visibility = "hidden";
			} else {
				this.scrollbar.style.visibility = "visible";
			}
			
			this.tracker.style.width = this.target.offsetWidth + "px";
			
			if(this.target.scrollWidth > this.scrollWidth) {
				var pct = (-this.target.scrollLeft / (-this.target.scrollWidth + this.target.offsetHeight));
				this.scroll(pct * (this.tracker.offsetWidth - this.scrub.offsetWidth), 0);
			}
		}
	}