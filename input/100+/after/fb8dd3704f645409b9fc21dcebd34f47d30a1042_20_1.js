function(args){
			var self = this,
				tabsAtBottom = self.constants.tabsAtBottom = lang.val(args && args.tabsAtBottom, self.constants.tabsAtBottom),
				TabBarContainer = declare(View, {
					// set a declared class here so that it's not defined globally, yet we still are able
					// to set a widget id and css class on the dom node.
					declaredClass: "Ti.UI.TabBarContainer",

					_doLayout: function(params) {
						var tabs = self.tabs,
							i = 0,
							numTabs = tabs.length - 1,
							totalDividerWidth = numTabs * self.tabDividerWidth,
							tabWidth = Math.floor((params.boundingSize.width - totalDividerWidth) / (numTabs + 1));

						while (i < numTabs) {
							tabs[i++]._defaultWidth = tabWidth;
						}

						// Make the last tab consume the remaining space. Fractional widths look really bad in tabs.
						tabs[i] && (tabs[i]._defaultWidth = params.boundingSize.width - totalDividerWidth - tabWidth * numTabs);

						return View.prototype._doLayout.apply(this, arguments)
					}
				});

			// Create the tab bar
			self._tabBarContainer = new TabBarContainer({
				width: UI_FILL,
				layout: UI._LAYOUT_CONSTRAINING_HORIZONTAL
			});
			self.tabHeight = 75;

			// Create the tab window container
			self._tabContentContainer = UI.createView({
				width: UI_FILL,
				height: UI_FILL
			});

			// Add the windows ordered such that they respect tabsAtBottom
			self.layout = "constrainingVertical";
			self.tabs = [];
			self.tabsAtBottom = lang.val(args && args.tabsAtBottom, true);
		}