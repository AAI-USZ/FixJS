function(e) {
				
				// Start the scrollbar
				self._startScrollBars({
					x: contentContainer.domNode.scrollLeft / (self._contentMeasurer._measuredWidth - self._measuredWidth),
					y: contentContainer.domNode.scrollTop / (self._contentMeasurer._measuredHeight - self._measuredHeight)
				},
				{
					x: contentContainer._measuredWidth / (self._contentMeasurer._measuredWidth),
					y: contentContainer._measuredHeight / (self._contentMeasurer._measuredHeight)
				});
				
				// Set the scroll position
				contentContainer.domNode.scrollLeft -= e.wheelDeltaX;
				contentContainer.domNode.scrollTop -= e.wheelDeltaY;
				
				// Create the scroll event and immediately update the position
				self._isScrollBarActive && self.fireEvent("scroll",{
					x: contentContainer.domNode.scrollLeft,
					y: contentContainer.domNode.scrollTop,
					dragging: false
				});
				self._updateScrollBars({
					x: (contentContainer.domNode.scrollLeft - e.wheelDeltaX) / (self._contentMeasurer._measuredWidth - self._measuredWidth),
					y: (contentContainer.domNode.scrollTop - e.wheelDeltaY) / (self._contentMeasurer._measuredHeight - self._measuredHeight)
				});
				setTimeout(function(){
					self._endScrollBars();
				},200);
			}