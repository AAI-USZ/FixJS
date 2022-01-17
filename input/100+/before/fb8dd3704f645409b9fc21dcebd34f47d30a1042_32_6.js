function() {
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
				}