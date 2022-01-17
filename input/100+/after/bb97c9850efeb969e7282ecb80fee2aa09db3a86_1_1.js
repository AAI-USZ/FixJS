function(e) {
				if (self.scrollingEnabled) {
					// Update the velocity calculations
					translationX = startTranslationX + e.distanceX;
					translationY = startTranslationY + e.distanceY;
					calculateVelocity();

					// Update the translation
					self._setTranslation(previousTranslationX = translationX, previousTranslationY = translationY);

					// Update the scroll bars
					var width = self._measuredWidth,
						height = self._measuredHeight,
						contentWidth = contentContainer._measuredWidth,
						contentHeight = contentContainer._measuredHeight;
					self._updateScrollBars({
						x: -self._currentTranslationX / (contentWidth - width),
						y: -self._currentTranslationY / (contentHeight - height)
					});
					
					self._handleDrag && self._handleDrag(e);
				}
			}