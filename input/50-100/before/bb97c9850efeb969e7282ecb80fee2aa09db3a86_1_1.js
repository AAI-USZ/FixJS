function(e) {
				if (this.scrollingEnabled) {
					self._animateToPosition(startTranslationX, startTranslationY, 400 + 0.3 * calculateDistance(
							startTranslationX, startTranslationY, self._currentTranslationX, self._currentTranslationY),
						"ease-in-out", function(){
							self._handleDragCancel && self._handleDragCancel(e);
						});
					self._endScrollBars();
					self._handleDragCancel && self._handleDragCancel(e);
				}
			}