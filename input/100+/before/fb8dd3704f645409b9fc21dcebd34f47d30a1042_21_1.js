function(e) {
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
			}