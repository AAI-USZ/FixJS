function(contentContainer, elasticity, scrollbars, enableMouseWheel){

			var contentContainerDomNode,
				self = this,
				velocity = 0,
				startTranslationX,
				startTranslationY,
				translationX,
				translationY,
				minTranslationX,
				minTranslationY,
				positionData,
				previousTime,
				currentTime,
				period,
				previousTranslationX,
				previousTranslationY,
				numSamples,
				velocityX,
				velocityY,
				scrollbarTimeout;
			self._currentTranslationX = 0;
			self._currentTranslationY = 0;
			self._horizontalElastic = elasticity === "horizontal" || elasticity === "both";
			self._verticalElastic = elasticity === "vertical" || elasticity === "both";
			
			(scrollbars === "horizontal" || scrollbars === "both") && this._createHorizontalScrollBar();
			(scrollbars === "vertical" || scrollbars === "both") && this._createVerticalScrollBar();

			// Create the content container
			self._add(self._contentContainer = contentContainer);
			contentContainerDomNode = contentContainer.domNode;

			// Calculate the velocity by calculating a weighted slope average, favoring more recent movement
			function calculateVelocity() {
				currentTime = (new Date).getTime();
				period = currentTime - previousTime;
				previousTime = currentTime;
				if (numSamples++) {
					velocityX = (velocityX * (numSamples - 1) + numSamples * (translationX - previousTranslationX) / period) / 2 / numSamples;
					velocityY = (velocityY * (numSamples - 1) + numSamples * (translationY - previousTranslationY) / period) / 2 / numSamples;
				} else {
					velocityX = (translationX - startTranslationX) / period;
					velocityY = (translationY - startTranslationY) / period;
				}
			}

			// Listen for postlayouts and update the translation
			on(self, "postlayout", function() {
				minTranslationX = self._minTranslationX = Math.min(0, self._measuredWidth - self._borderLeftWidth - self._borderRightWidth - self._contentContainer._measuredWidth);
				minTranslationY = self._minTranslationY = Math.min(0, self._measuredHeight - self._borderTopWidth - self._borderBottomWidth - self._contentContainer._measuredHeight);
			});

			on(self, "draggingstart", function(e) {
				if (this.scrollingEnabled) {
					// Initialize the velocity calculations
					velocityX = void 0;
					velocityY = void 0;
					startTranslationX = self._currentTranslationX;
					startTranslationY = self._currentTranslationY;
					numSamples = 0;
					previousTime = (new Date).getTime();

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
			});

			on(self, "dragging", function(e) {
				if (this.scrollingEnabled) {
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
					this._updateScrollBars({
						x: -self._currentTranslationX / (contentWidth - width),
						y: -self._currentTranslationY / (contentHeight - height)
					});
					
					self._handleDrag && self._handleDrag(e);
				}
			});

			on(self, "draggingcancel", function(e) {
				if (this.scrollingEnabled) {
					self._animateToPosition(startTranslationX, startTranslationY, 400 + 0.3 * calculateDistance(
							startTranslationX, startTranslationY, self._currentTranslationX, self._currentTranslationY),
						"ease-in-out", function(){
							self._handleDragCancel && self._handleDragCancel(e);
						});
					self._endScrollBars();
					self._handleDragCancel && self._handleDragCancel(e);
				}
			});

			on(self, "draggingend", function(e) {
				if (this.scrollingEnabled) {
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
			});

			// Handle mouse wheel scrolling
			enableMouseWheel && (this._disconnectMouseWheelEvent = on(self.domNode, "mousewheel",function(e) {
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
			}));
		}