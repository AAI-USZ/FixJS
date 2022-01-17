function(i, selectedTab) {
							newForm.find('#' + selectedTab.id).tabs('select', selectedTab.selected);
						}