function() {
								this.domNode.style.width = "";
								this.domNode.style.height = "";
								var imageRatio = this.domNode.width / this.domNode.height;
								isNaN(imageRatio) && (imageRatio = this.domNode.width === 0 ? 1 : Infinity);
								this._imageRatio = imageRatio;
								
								this.container._triggerLayout();
								this.onload && this.onload();
							}