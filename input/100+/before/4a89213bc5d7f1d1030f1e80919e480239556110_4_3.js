function(e){
			// summary:
			//		Internal handler for click events.
			// tags:
			//		private
			if(this.onClick(e) === false){ return; } // user's click action
			if(e && e.type === "keydown"){ // keyboard navigation for accessibility
				if(e.keyCode === 39){ // right arrow
					this.onNextBtnClick();
				}else if(e.keyCode === 37){ // left arrow
					this.onPrevBtnClick();
				}else if(e.keyCode !== 13){ // !Enter
					return;
				}
			}

			var w;
			for(w = registry.getEnclosingWidget(e.target); ; w = w.getParent()){
				if(!w){ return; }
				if(w.getParent() instanceof SwapView){ break; }
			}
			this.select(w);
			var idx = this.getIndexByItemWidget(w);
			connect.publish("/dojox/mobile/carouselSelect", [this, w, this.items[idx], idx]);
		}