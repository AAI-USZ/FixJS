function(args) {
			var win = args && args.window,
				container = UI.createView({
					layout: UI._LAYOUT_CONSTRAINING_VERTICAL,
					width: "100%",
					height: UI_SIZE
				}),
				navGroup = this._tabNavigationGroup = MobileWeb.createNavigationGroup({ window: win, _tab: this });;

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

			win && require.on(this, "singletap", this, function(e) {
				var tg = this._tabGroup;
				if (tg) {
					if (tg.activeTab === this) {
						navGroup._reset();
					} else {
						tg.activeTab = this;
					}
				}
			});
		}