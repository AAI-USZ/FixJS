function(e) {
				if (this.scrollingEnabled) {
					var distanceX = contentContainer._measuredWidth - self._measuredWidth,
						distanceY = contentContainer._measuredHeight - self._measuredHeight,
						currentPositionX = -self._currentTranslationX,
						currentPositionY = -self._currentTranslationY;

					// Start the scrollbar
					self._startScrollBars({
						x: currentPositionX / distanceX,
						y: currentPositionY / distanceY
					},
					{
						x: self._measuredWidth / contentContainer._measuredWidth,
						y: self._measuredHeight / contentContainer._measuredHeight
					});

					// Set the scroll position
					self._setTranslation(Math.min(0, Math.max(self._minTranslationX,-currentPositionX + e.wheelDeltaX)),
						Math.min(0, Math.max(self._minTranslationY,-currentPositionY + e.wheelDeltaY)));

					// Create the scroll event and immediately update the position
					self._updateScrollBars({
						x: currentPositionX / distanceX,
						y: currentPositionY / distanceY
					});
					clearTimeout(scrollbarTimeout);
					scrollbarTimeout = setTimeout(function(){
						self._endScrollBars();
					},500);

					self._handleMouseWheel && self._handleMouseWheel();
				}
			}