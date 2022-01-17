function() {
			var contentContainer = this._contentContainer = UI.createView({
				width: UI.SIZE,
				height: UI.SIZE,
				layout: UI._LAYOUT_CONSTRAINING_HORIZONTAL,
				borderColor: "transparent"
			});
			this._add(contentContainer);
			contentContainer._add(this._buttonImage = UI.createImageView());
			contentContainer.add(this._buttonTitle = UI.createLabel());
			this._addStyleableDomNode(this._buttonTitle.domNode);
			
			this._setDefaultLook();
			
			this.addEventListener("touchstart",function(){
				if (this.selectedColor) {
					this._buttonTitle.color = this.selectedColor;
				}
			});
			this.addEventListener("touchend",function(){
				if (this.selectedColor) {
					this._buttonTitle.color = this.color || "black";
				}
			});
			this.domNode.addEventListener("mouseout",lang.hitch(this,function(){
				if (this.selectedColor) {
					this._buttonTitle.color = this.color || "black";
				}
			}));
		}