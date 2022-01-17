function(anim, callback) {
			anim = anim || {};
			var curve = curves[anim.curve] || "ease",
				self = this,
				fn = function() {

					// It is possible for the asynchronicity of animations to leave us in a state where the element was removed from its parent mid-animation
					if (!self._parent) {
						return;
					}

					var transformCss = "";

					// Set the color and opacity properties
					anim.backgroundColor !== void 0 && (self.backgroundColor = anim.backgroundColor);
					anim.opacity !== void 0 && setStyle(self.domNode, "opacity", anim.opacity);
					setStyle(self.domNode, "display", anim.visible !== void 0 && !anim.visible ? "none" : "");

					// Set the position and size properties
					if (!["left", "top", "right", "bottom", "center", "width", "height", "borderWidth"].every(function(v) { return !isDef(anim[v]); })) {
						self._parent._layout.calculateAnimation(self, anim); // Guaranteed a parent because of the _isAttachedToActiveWin check in animate()
					}

					// Set the z-order
					!isDef(anim.zIndex) && setStyle(self.domNode, "zIndex", anim.zIndex);

					// Set the transform properties
					if (anim.transform) {
						self._curTransform = self._curTransform ? self._curTransform.multiply(anim.transform) : anim.transform;
						transformCss = self._curTransform.toCSS();
					}

					setStyle(self.domNode, "transform", transformCss);
				};

			anim.duration = anim.duration || 0;
			anim.delay = anim.delay || 0;
			anim.transform && setStyle(self.domNode, "transform", "");
			anim.start && anim.start();

			if (anim.duration > 0) {
				function completeAnimation(){
					if (!self._destroyed) {
						// Clear the transform so future modifications in these areas are not animated
						setStyle(self.domNode, "transition", "");
						is(anim.complete, "Function") && anim.complete();
						is(callback, "Function") && callback.call(self);
					}
				}
				
				// Create the transition, must be set before setting the other properties
				if (style.supports("transition", self.domNode)) {
					setStyle(self.domNode, "transition", "all " + anim.duration + "ms " + curve + (anim.delay ? " " + anim.delay + "ms" : ""));
					on.once(window, transitionEnd, function(e) {
						completeAnimation();
					});
				} else {
					setTimeout(completeAnimation,anim.duration);
				}
				setTimeout(fn, 0);
			} else {
				fn();
				is(anim.complete, "Function") && anim.complete();
				is(callback, "Function") && callback.call(self);
			}
		}