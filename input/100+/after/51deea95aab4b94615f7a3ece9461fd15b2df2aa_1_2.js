function(e) {
				if (self.scrollingEnabled) {
					translationX = startTranslationX + e.distanceX;
					translationY = startTranslationY + e.distanceY;
					calculateVelocity();
					var x = self._currentTranslationX,
						y = self._currentTranslationY,
						springBack;

					// Spring back if need be
					if (x > 0) {
						x = 0;
						springBack = 1;
					} else if(x < minTranslationX) {
						x = minTranslationX;
						springBack = 1;
					}
					if (y > 0) {
						y = 0;
						springBack = 1;
					} else if(y < minTranslationY) {
						y = minTranslationY;
						springBack = 1;
					}

					if (springBack) {
						self._animateToPosition(x, y, 200, "ease-out", function(){
							self._handleDragEnd && self._handleDragEnd(e);
						});
					} else {
						self._handleDragEnd && self._handleDragEnd(e, velocityX, velocityY);
					}
				}
			}