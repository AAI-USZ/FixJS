function(e) {
				if (self.scrollingEnabled) {
					var distanceX = contentContainer._measuredWidth - self._measuredWidth,
						distanceY = contentContainer._measuredHeight - self._measuredHeight,
						currentPositionX = -self._currentTranslationX,
						currentPositionY = -self._currentTranslationY;

					minTranslationX = self._minTranslationX = Math.min(0, self._measuredWidth - self._borderLeftWidth - self._borderRightWidth - self._contentContainer._measuredWidth);
					minTranslationY = self._minTranslationY = Math.min(0, self._measuredHeight - self._borderTopWidth - self._borderBottomWidth - self._contentContainer._measuredHeight);

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