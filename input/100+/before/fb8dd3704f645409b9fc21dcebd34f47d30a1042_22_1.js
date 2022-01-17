function(args) {
			this.add(this._defaultControl = UI.createView({
				width: UI.INHERIT,
				height: UI.INHERIT,
				layout: "horizontal"
			}));
			this._defaultControl._layout._defaultVerticalAlignment = "center";
			
			this._defaultControl.add(this._leftImageView = UI.createImageView({
				width: UI.SIZE,
				height: UI.SIZE
			})); 

			this._defaultControl.add(this._titleLabel = UI.createLabel({
				width: UI.INHERIT,
				height: UI.INHERIT,
				wordWrap: false
			}));

			this._defaultControl.add(this._rightImageView = UI.createImageView({
				width: UI.SIZE, 
				height: UI.SIZE
			}));
		}