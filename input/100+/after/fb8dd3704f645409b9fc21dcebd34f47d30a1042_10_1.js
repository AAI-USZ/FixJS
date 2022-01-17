function(args) {
			var self = this,
				win = self.constants.window = args && args.window,
				tab = args && args._tab,
				navBar = self._navBarContainer = UI.createView({
					width: UI_FILL,
					height: 50
				});

			self.layout = UI._LAYOUT_CONSTRAINING_VERTICAL;

			css.add(navBar.domNode, navGroupCss);

			self._navBarContainer._add(self._backButton = UI.createButton({
				title: "Back",
				left: 5,
				opacity: 0,
				enabled: true
			}));

			self._backButton.addEventListener("singletap", function() {
				self.close(self._windows[self._windows.length-1]);
			});

			self._navBarContainer._add(self._title = UI.createLabel({
				width: UI_FILL,
				textAlign: UI.TEXT_ALIGNMENT_CENTER,
				touchEnabled: false
			}));

			// Create the content container
			self._contentContainer = UI.createView({
				width: UI_FILL,
				height: UI_FILL
			});

			// init window stack and add window
			self._windows = [];
			win && this._addWindow(win);

			// invoke the navBarAtTop setter
			self.navBarAtTop = true;
		}