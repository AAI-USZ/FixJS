function() {
			if (!this._hasDefaultLook) {
				this._hasDefaultLook = true;
				this._previousBorderWidth = this.borderWidth;
				this._previousBorderColor = this.borderColor;
				css.add(this.domNode, "TiUIElementGradient");
				css.add(this.domNode, "TiUIButtonDefault");
				this._contentContainer.borderWidth = 6;
				this._getBorderFromCSS();
			}
		}