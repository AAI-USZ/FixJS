function() {
			this.add(this._contentContainer = UI.createView({
				width: UI.INHERIT,
				height: UI.INHERIT,
				left: 0,
				top: 0,
				layout: UI._LAYOUT_CONSTRAINING_VERTICAL
			}));
			this._contentContainer._layout._defaultHorizontalLayout = "start";
			this._contentContainer.add(this._message = UI.createLabel());
			this._contentContainer.add(this._progressBar = new InternalProgressBar({
				width: UI.INHERIT,
				height: UI.INHERIT
			}));
		}