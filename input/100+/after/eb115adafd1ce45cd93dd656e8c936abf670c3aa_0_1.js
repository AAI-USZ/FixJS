function(e) {
				if (this.scrollingEnabled) {

					// Initialize the velocity calculations
					velocityX = void 0;
					velocityY = void 0;
					startTranslationX = self._currentTranslationX;
					startTranslationY = self._currentTranslationY;
					numSamples = 0;
					previousTime = (new Date).getTime();

					minTranslationX = self._minTranslationX = Math.min(0, self._measuredWidth - self._borderLeftWidth - self._borderRightWidth - self._contentContainer._measuredWidth);
					minTranslationY = self._minTranslationY = Math.min(0, self._measuredHeight - self._borderTopWidth - self._borderBottomWidth - self._contentContainer._measuredHeight);

					// Start the scroll bars
					var width = self._measuredWidth,
						height = self._measuredHeight,
						contentWidth = contentContainer._measuredWidth,
						contentHeight = contentContainer._measuredHeight;
					self._startScrollBars({
						x: -self._currentTranslationX / (contentWidth - width),
						y: -self._currentTranslationY / (contentHeight - height)
					},
					{
						x: width / contentWidth,
						y: height / contentHeight
					});

					// Call the callback
					self._handleDragStart && self._handleDragStart(e);
				}
			}