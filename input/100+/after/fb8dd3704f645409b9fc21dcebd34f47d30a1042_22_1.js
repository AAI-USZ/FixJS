function(args) {
			this._contentAligner = UI.createView({
				width: UI.INHERIT,
				height: UI.INHERIT,
				layout: "constrainingHorizontal"
			});
			this.add(this._contentAligner);
			
			this._contentAligner.add(this._leftImageView = UI.createImageView({
				width: UI.SIZE,
				height: UI.SIZE
			})); 

			this._contentAligner.add(this._titleLabel = UI.createLabel({
				width: UI.INHERIT,
				height: UI.SIZE,
				wordWrap: false
			}));

			this._contentAligner.add(this._rightImageView = UI.createImageView({
				right: 0,
				width: UI.SIZE,
				height: UI.SIZE
			}));
		}