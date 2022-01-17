function(anim, callback) {
			var anim = anim || {},
				curve = curves[anim.curve] || "ease",
				fn = lang.hitch(this, function() {
					var transformCss = "";

					// Set the color and opacity properties
					anim.backgroundColor !== void 0 && (this.backgroundColor = anim.backgroundColor);
					anim.opacity !== void 0 && setStyle(this.domNode, "opacity", anim.opacity);
					setStyle(this.domNode, "display", anim.visible !== void 0 && !anim.visible ? "none" : "");
					
					// Set the position and size properties
					
					if (!["left", "top", "right", "bottom", "center", "width", "height"].every(function(v) { return !isDef(anim[v]); })) {
						// TODO set border width here

						var dimensions = this._computeDimensions({
							layoutParams: this._layoutParams,
							position: {
								left: val(anim.left, this.left),
								top: val(anim.top, this.top),
								right: val(anim.right, this.right),
								bottom: val(anim.bottom, this.bottom),
								center: anim.center || this.center
							},
							size: {
								width: val(anim.width, this.width),
								height: val(anim.height, this.height)
							},
							layoutChildren: false
						});
	
						setStyle(this.domNode, {
							left: unitize(dimensions.left),
							top: unitize(dimensions.top),
							width: unitize(dimensions.width),
							height: unitize(dimensions.height),
							borderLeftWidth: unitize(dimensions.borderSize.left),
							borderTopWidth: unitize(dimensions.borderSize.top),
							borderRightWidth: unitize(dimensions.borderSize.right),
							borderBottomWidth: unitize(dimensions.borderSize.bottom)
						});
					}

					// Set the z-order
					!isDef(anim.zIndex) && setStyle(this.domNode, "zIndex", anim.zIndex);

					// Set the transform properties
					if (anim.transform) {
						this._curTransform = this._curTransform ? this._curTransform.multiply(anim.transform) : anim.transform;
						transformCss = this._curTransform.toCSS();
					}

					setStyle(this.domNode, "transform", transformCss);
				});

			anim.duration = anim.duration || 0;
			anim.delay = anim.delay || 0;
			anim.transform && setStyle(this.domNode, "transform", "");
			anim.start && anim.start();

			if (anim.duration > 0) {
				
				function completeAnimation(){
					if (!this._destroyed) {
						// Clear the transform so future modifications in these areas are not animated
						setStyle(this.domNode, "transition", "");
						is(anim.complete, "Function") && anim.complete();
						is(callback, "Function") && callback();
					}
				}
				
				// Create the transition, must be set before setting the other properties
				if (style.supports("transition", this.domNode)) {
					setStyle(this.domNode, "transition", "all " + anim.duration + "ms " + curve + (anim.delay ? " " + anim.delay + "ms" : ""));
					on.once(window, transitionEnd, lang.hitch(this, function(e) {
						completeAnimation();
					}));
				} else {
					setTimeout(completeAnimation,anim.duration);
				}
				setTimeout(fn, 0);
			} else {
				fn();
				is(anim.complete, "Function") && anim.complete();
				is(callback, "Function") && callback();
			}
		}