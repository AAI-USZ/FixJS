function(params) {
				// We have to remove the old style to get the image to scale to its default size,
				// otherwise we are just reading in whatever we set in the last doLayout(), which is
				// 0 if the image was not loaded...thus always clamping it to 0.
				this.domNode.style.width = "";
				this.domNode.style.height = "";
				
				var imageRatio = this.domNode.width / this.domNode.height,
					boundingHeight = params.boundingSize.height,
					boundingWidth = params.boundingSize.width,
					values = this.properties.__values__,
					isParentWidthSize = params.isParentSize.width,
					isParentHeightSize = params.isParentSize.height;

				function setByHeight() {
					values.width = boundingHeight * imageRatio;
					values.height = boundingHeight;
				}

				function setByWidth() {
					values.width = boundingWidth;
					values.height = boundingWidth / imageRatio;
				}

				if (!isParentWidthSize && !isParentHeightSize) {
					if (boundingWidth / boundingHeight > imageRatio) {
						setByHeight();
					} else {
						setByWidth();
					}
				} else if (!isParentWidthSize) {
					setByWidth();
				} else if (!isParentHeightSize) {
					setByHeight();
				} else {
					values.width = UI.SIZE;
					values.height = UI.SIZE;
				}

				return Widget.prototype._doLayout.call(this,params);
			}