function(view) {
			var viewIndex = is(view,"Number") ? view : this.views.indexOf(view)
			
			// Sanity check
			if (viewIndex < 0 || viewIndex >= this.views.length || viewIndex == this.currentPage) {
				return;
			}
	
			// If the scrollableView hasn't been laid out yet, we can't do much since the scroll distance is unknown.
			// At the same time, it doesn't matter since the user won't see it anyways. So we just append the new
			// element and don't show the transition animation.
			if (!this._contentContainer.domNode.offsetWidth) {
				this._contentContainer._removeAllChildren();
				this._contentContainer.add(this.views[viewIndex]);
			} else {
				
				// Calculate the views to be scrolled
				var width = this._measuredWidth,
					viewsToScroll = [],
					scrollingDirection = -1,
					initialPosition = 0;
				if (viewIndex > this.currentPage) {
					for (var i = this.currentPage; i <= viewIndex; i++) {
						viewsToScroll.push(this.views[i]);
					}
				} else {
					for (var i = viewIndex; i <= this.currentPage; i++) {
						viewsToScroll.push(this.views[i]);
					}
					initialPosition = -(viewsToScroll.length - 1) * width;
					scrollingDirection = 1;
				}
	
				// Create the animation div
				var animationView = UI.createView({
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
	
				// Set the start time
				var duration = 300 + 0.2 * (width), // Calculate a weighted duration so that larger views take longer to scroll.
					distance = (viewsToScroll.length - 1) * width;
					
				this._updatePagingControl(viewIndex);
				animationView.animate({
					duration: duration,
					left: initialPosition + scrollingDirection * distance,
					curve: UI.ANIMATION_CURVE_EASE_IN_OUT
				},lang.hitch(this,function(){
					this._contentContainer._removeAllChildren();
					this._contentContainer.add(this.views[viewIndex]);
					this._triggerLayout(true);
					this.properties.__values__.currentPage = viewIndex;
					if (this._viewToRemoveAfterScroll != -1) {
						this._removeViewFromList(this._viewToRemoveAfterScroll);
						this._viewToRemoveAfterScroll = -1;
					}
					this.fireEvent("scroll",{
						currentPage: viewIndex,
						view: this.views[viewIndex]
					});
				}));
			}
		}