function(e, element){
			if (e.touches.length == 0 && e.changedTouches.length == 1 && this._touchStartLocation) {
				var x = e.changedTouches[0].clientX,
					y = e.changedTouches[0].clientY;
				if (Math.abs(this._touchStartLocation.x - x) < this._driftThreshold && 
						Math.abs(this._touchStartLocation.y - y) < this._driftThreshold) {
					this._touchStartLocation = null;
					var result = {
						x: x,
						y: y,
						source: this.getSourceNode(e,element)
					};
					if (!element._isGestureBlocked(this.name)) {
						lang.hitch(element,element._handleTouchEvent("click",result));
						lang.hitch(element,element._handleTouchEvent(this.name,result));
					}
				}
			}
		}