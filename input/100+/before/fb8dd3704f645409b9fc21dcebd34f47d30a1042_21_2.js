function(args) {
			
			// Content must go in a separate container so the scrollbar can exist outside of it
			var contentContainer = this._contentContainer = UI.createView({
				width: UI.INHERIT,
				height: UI.INHERIT,
				left: 0,
				top: 0,
				layout: 'vertical'
			});
			this.add(contentContainer);
			setStyle(contentContainer.domNode,"overflow","hidden");
			
			// Use horizontal layouts so that the default location is always (0,0)
			contentContainer.add(this._header = UI.createView({
				height: UI.SIZE, 
				width: UI.INHERIT, 
				layout: "vertical"
			}));
			contentContainer.add(this._sections = UI.createView({
				height: UI.SIZE, 
				width: UI.INHERIT, 
				layout: "vertical"
			}));
			contentContainer.add(this._footer = UI.createView({
				height: UI.SIZE, 
				width: UI.INHERIT, 
				layout: "vertical"
			}));
			
			this.data = [];
			
			this._createVerticalScrollBar();
			
			var self = this;
			function getContentHeight() {
				return self._header._measuredHeight + self._sections._measuredHeight + self._footer._measuredHeight;
			}
			
			// Handle scrolling
			var previousTouchLocation;
			this.addEventListener("touchstart",function(e) {
				previousTouchLocation = e.y;
				
				this._startScrollBars({
					y: contentContainer.domNode.scrollTop / (getContentHeight() - this._measuredHeight)
				},
				{
					y: contentContainer._measuredHeight / (getContentHeight())
				});
			});
			this.addEventListener("touchend",function(e) {
				previousTouchLocation = null;
				
				this._endScrollBars();
				
				// Create the scroll event
				this._isScrollBarActive && this.fireEvent("scrollEnd",{
					contentOffset: {x: 0, y: contentContainer.domNode.scrollTop + this._header._measuredHeight},
					contentSize: {width: this._sections._measuredWidth, height: this._sections._measuredHeight},
					size: {width: this._measuredWidth, height: this._measuredHeight},
					x: e.x,
					y: e.y
				});
			});
			this.addEventListener("touchmove",lang.hitch(this,function(e) {
				contentContainer.domNode.scrollTop += previousTouchLocation - e.y;
				previousTouchLocation = e.y;
				
				this._updateScrollBars({
					y: contentContainer.domNode.scrollTop / (getContentHeight() - this._measuredHeight)
				});
				
				this._fireScrollEvent(e.x,e.y);
			}));
			this.domNode.addEventListener("mousewheel",function(e) {
				self._startScrollBars({
					y: contentContainer.domNode.scrollTop / (getContentHeight() - self._measuredHeight)
				},
				{
					y: contentContainer._measuredHeight / (getContentHeight())
				});
				setTimeout(function(){
					contentContainer.domNode.scrollLeft -= e.wheelDeltaX;
					contentContainer.domNode.scrollTop -= e.wheelDeltaY;
					self._updateScrollBars({
						y: (contentContainer.domNode.scrollTop - e.wheelDeltaY) / (getContentHeight() - self._measuredHeight)
					});
					setTimeout(function(){
						self._endScrollBars();
					},10);
				},10);
			});
			
			require.on(contentContainer.domNode,"scroll",lang.hitch(this,function(e){
				if (!this._touching) {
					this._fireScrollEvent();
				}
			}));
		}