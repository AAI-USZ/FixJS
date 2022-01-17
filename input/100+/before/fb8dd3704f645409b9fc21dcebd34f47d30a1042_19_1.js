function(args) {
			var win = args && args.window,
				container = UI.createView({
					layout: "vertical",
					width: "100%",
					height: UI_SIZE
				});

			this._add(container);

			container.add(this._tabIcon = UI.createImageView({
				height: UI_SIZE,
				width: UI_SIZE
			}));

			container.add(this._tabTitle = UI.createLabel({
				width: "100%",
				wordWrap: true,
				textAlign: UI.TEXT_ALIGNMENT_CENTER
			}));

			if (win) {
				this._windows.push(win);

				require.on(this, "singletap", this, function(e) {
					this._tabGroup && (this._tabGroup.activeTab = this);
				});
			}

			this._tabNavigationGroup = MobileWeb.createNavigationGroup({ window: win, _tab: this });
		}