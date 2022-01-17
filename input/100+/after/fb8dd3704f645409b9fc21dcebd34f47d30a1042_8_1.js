function(boundingWidth, boundingHeight, isParentWidthSize, isParentHeightSize) {
								
				// We have to remove the old style to get the image to scale to its default size,
				// otherwise we are just reading in whatever we set in the last doLayout(), which is
				// 0 if the image was not loaded...thus always clamping it to 0.
				this.domNode.style.width = "";
				this.domNode.style.height = "";
				
				var imageRatio = this.domNode.width / this.domNode.height,
					values = this.properties.__values__,
					oldWidth = values.width,
					oldHeight = values.height;

				if (!isParentWidthSize && !isParentHeightSize) {
					if (boundingWidth / boundingHeight > imageRatio) {
						values.width = boundingHeight * imageRatio;
						values.height = boundingHeight;
					} else {
						values.width = boundingWidth;
						values.height = boundingWidth / imageRatio;
					}
				} else if (!isParentWidthSize) {
					values.width = boundingWidth;
					values.height = boundingWidth / imageRatio;
				} else if (!isParentHeightSize) {
					values.width = boundingHeight * imageRatio;
					values.height = boundingHeight;
				} else {
					values.width = UI.SIZE;
					values.height = UI.SIZE;
				}
				
				return oldWidth !== values.width || oldHeight !== values.height;
			}