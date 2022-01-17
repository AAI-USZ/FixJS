function () {
			// set the width and height to default to calculate geometry
			this.el.style.width = '';
			this.el.style.height = '';			
			
			this.container = F5.elementOffsetGeometry(this.el.parentElement);
			var absolutePosition = F5.elementAbsolutePosition(this.el.parentElement);
			this.container.left = absolutePosition.x;
			this.container.top = absolutePosition.y;
			
			var oldMinOffset = this.minOffset;
			if (this.horizontal) {
				this.minOffset = Math.min(this.container.width - this.el.offsetWidth, 0);				
			} else {
				this.minOffset = Math.min(this.container.height - this.el.offsetHeight, 0);
			}
			if (oldMinOffset !== this.minOffset) {
				this.staticOffset = 0;
				doTransform(this, 0);				
			}
			
			this.initialized = false;				
			
			// set height to 100% so that the OS doesn't try to page in the large div
			if (this.horizontal) {
				this.el.style.width = '100%';				
			} else {
				this.el.style.height = '100%';				
			}			
		}