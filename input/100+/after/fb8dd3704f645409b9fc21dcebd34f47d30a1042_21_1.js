function(e) {
				
				// Start the scroll bar
				self._startScrollBars({
					y: contentContainer.domNode.scrollTop / (getContentHeight() - self._measuredHeight)
				},
				{
					y: contentContainer._measuredHeight / (getContentHeight())
				});
				
				// Set the scroll position
				contentContainer.domNode.scrollLeft -= e.wheelDeltaX;
				contentContainer.domNode.scrollTop -= e.wheelDeltaY;
				
				// Immediately update the position
				self._updateScrollBars({
					y: (contentContainer.domNode.scrollTop - e.wheelDeltaY) / (getContentHeight() - self._measuredHeight)
				});
				setTimeout(function(){
					self._endScrollBars();
				},200);
			}