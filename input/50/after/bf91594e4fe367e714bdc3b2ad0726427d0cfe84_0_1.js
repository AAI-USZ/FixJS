function(i, selectedTab) {
						var el = self.find('#' + selectedTab.id);
						if(!el.data('tabs')) return; // don't act on uninit'ed controls
						el.tabs('select', selectedTab.selected);
					}