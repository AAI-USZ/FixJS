function(args){

			// Create the content container
			this._contentContainer = UI.createView({
				left: 0,
				top: 0,
				width: "100%",
				height: "100%"
			});
			setStyle(this._contentContainer.domNode, "overflow", "hidden");
			this.add(this._contentContainer);

			// Create the paging control container
			this.add(this._pagingControlContainer = UI.createView({
				width: "100%",
				height: 20,
				bottom: 0,
				backgroundColor: "black",
				opacity: 0,
				touchEnabled: false
			}));

			this._pagingControlContainer.add(this._pagingControlContentContainer = UI.createView({
				width: UI.SIZE,
				height: "100%",
				top: 0,
				touchEnabled: false
			}));

			// State variables
			this._viewToRemoveAfterScroll = -1;

			var initialPosition,
				animationView,
				swipeInitialized = false,
				viewsToScroll,
				touchEndHandled,
				startTime;

			// This touch end handles the case where a swipe was started, but turned out not to be a swipe
			this.addEventListener("touchend", function(e) {
				if (!touchEndHandled && swipeInitialized) {
					var width = this._measuredWidth,
						destinationLeft = viewsToScroll.indexOf(this.views[this.currentPage]) * -width;
					animationView.animate({
						duration: (300 + 0.2 * width) / (width - Math.abs(e._distance)) * 10,
						left: destinationLeft,
						curve: UI.ANIMATION_CURVE_EASE_OUT
					},lang.hitch(this,function(){
						this._contentContainer._removeAllChildren();
						this._contentContainer.add(this.views[this.currentPage]);
					}));
				}
			})

			this.addEventListener("swipe", function(e){
				// If we haven't started swiping yet, start swiping,
				var width = this._measuredWidth;
				if (!swipeInitialized) {
					swipeInitialized = true;
					touchEndHandled = false;
					startTime = (new Date()).getTime();
					
					// Create the list of views that can be scrolled, the ones immediately to the left and right of the current view
					initialPosition = 0;
					viewsToScroll = [];
					if (this.currentPage > 0) {
						viewsToScroll.push(this.views[this.currentPage - 1]);
						initialPosition = -width;
					}
					viewsToScroll.push(this.views[this.currentPage]);
					if (this.currentPage < this.views.length - 1) {
						viewsToScroll.push(this.views[this.currentPage + 1]);
					}
					
					// Create the animation div
					animationView = UI.createView({
						width: unitize(viewsToScroll.length * width),
						height: "100%",
						left: initialPosition,
						top: 0
					});
		
					// Attach the child views, each contained in their own div so we can mess with positioning w/o touching the views
					this._contentContainer._removeAllChildren();
					for (var i = 0; i < viewsToScroll.length; i++) {
						var viewContainer = UI.createView({
							left: unitize(i * width),
							top: 0,
							width: unitize(width),
							height: "100%",
							layout: "horizontal" // Do a horizontal to force the child to (0,0) without overwriting the original position values
						});
						setStyle(viewContainer.domNode,"overflow","hidden");
						viewContainer.add(viewsToScroll[i]);
						animationView.add(viewContainer);
					}
					
					// Set the initial position
					animationView.left = unitize(initialPosition);
					this._contentContainer.add(animationView);
					this._triggerLayout(true);
				}
				
				// Update the position of the animation div
				var newPosition = initialPosition + e._distance;
				newPosition = newPosition < 0 ? newPosition > -animationView._measuredWidth + width ? newPosition :-animationView._measuredWidth + width : 0;
				animationView.domNode.style.left = unitize(newPosition);
				
				// If the swipe is finished, we animate to the final position
				if (e._finishedSwiping) {
					swipeInitialized = false;
					touchEndHandled = true;
					
					// Determine whether this was a flick or a drag
					var velocity = Math.abs((e._distance) / ((new Date()).getTime() - startTime));
					var scaleFactor = velocity > this._velocityThreshold ? 
						this._minimumFlickDistanceScaleFactor : this._minimumDragDistanceScaleFactor
					
					// Find out which view we are animating to
					var destinationIndex = this.currentPage,
						animationLeft = initialPosition;
					if (e._distance > width / scaleFactor && this.currentPage > 0) {
						destinationIndex = this.currentPage - 1;
						animationLeft = 0;
					} else if (e._distance < -width / scaleFactor && this.currentPage < this.views.length - 1) {
						destinationIndex = this.currentPage + 1;
						if (viewsToScroll.length === 3) {
							animationLeft = -2 * width;
						} else {
							animationLeft = -width;
						}
					}
					
					var self = this;
					function finalizeSwipe() {
						self._contentContainer._removeAllChildren();
						self._contentContainer.add(self.views[destinationIndex]);
						self._triggerLayout(true);
						
						self.currentPage !== destinationIndex && self.fireEvent("scroll",{
							currentPage: destinationIndex,
							view: self.views[destinationIndex],
							x: e.x,
							y: e.y
						});
						
						self.properties.__values__.currentPage = destinationIndex;
					}
					
					// Check if the user attempted to scroll past the edge, in which case we directly reset the view instead of animation
					this._updatePagingControl(destinationIndex);
					if (newPosition == 0 || newPosition == -animationView._measuredWidth + width) {
						finalizeSwipe();
					} else {
						// Animate the view and set the final view
						animationView.animate({
							duration: 200 + (0.2 * width) / (width - Math.abs(e._distance)) * 10,
							left: animationLeft,
							curve: UI.ANIMATION_CURVE_EASE_OUT
						},lang.hitch(this,function(){
							finalizeSwipe();
						}));
					}
				}
			});
		}