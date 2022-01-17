function() {
			this.add(this._contentContainer = UI.createView({
				width: UI.SIZE,
				height: UI.SIZE,
				left: 0,
				top: 0,
				layout: "vertical"
			}));
			this._contentContainer._layout._defaultHorizontalLayout = "left";
			this._contentContainer.add(this._message = UI.createLabel());
			this._contentContainer.add(this._progressBar = new InternalProgressBar());
		}