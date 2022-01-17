function(i, selectedTab) {
						self.find('#' + selectedTab.id).tabs('select', selectedTab.selected);
					}