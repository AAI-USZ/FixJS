function() {

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
				}