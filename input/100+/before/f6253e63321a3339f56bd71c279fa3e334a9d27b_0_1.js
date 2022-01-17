function(args) {

			this._layout = new ConstrainingHorizontal(this);

			this._add(this._leftImageView = UI.createImageView({
				width: UI.SIZE,
				height: UI.SIZE
			})); 

			var centerContainer = UI.createView({
				width: UI.INHERIT,
				height: UI.INHERIT
			});
			this._add(centerContainer);

			centerContainer._add(this._titleLabel = UI.createLabel({
				width: UI.INHERIT,
				height: UI.INHERIT,
				wordWrap: false
			}));

			centerContainer._add(this._contentContainer = UI.createView({
				width: UI.INHERIT,
				height: UI.INHERIT
			}));

			this._add(this._rightImageView = UI.createImageView({
				right: 0,
				width: UI.SIZE,
				height: UI.SIZE
			}));

			// Force single tap to be processed.
			this.addEventListener("singletap");
		}