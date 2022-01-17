function(index, tab) {

				// remember the active tab
				if (tab.extPanel == activeExtTab) {
					activeTab = tab;
				}

				// remember whether the tab is currently visible
				var tabVisible = tab.visible;

				// let each tab generate its ext component and add them to the panel
				if (tab.doLayout()) {
					// found a visible tab, so the floatingmenu needs to be visible as well
					floatingMenuVisible = true;

					// make sure the tabstrip is visible
					if (!tabVisible) {
						if (Aloha.Log.isDebugEnabled()) {
							Aloha.Log.debug(that, 'showing tab strip for tab ' + tab.label);
						}
						that.extTabPanel.unhideTabStripItem(tab.extPanel);
					}

					// remember the first visible tab
					if (!firstVisibleTab) {
						// this is the first visible tab (in case we need to switch to it)
						firstVisibleTab = tab;
					}
					// check whether this visible tab is the last user activated tab and currently not active
					if (that.userActivatedTab == tab.extPanel.title && tab.extPanel != activeExtTab) {
						showUserActivatedTab = tab;
					}
				} else {
					// make sure the tabstrip is hidden
					if (tabVisible) {
						if (Aloha.Log.isDebugEnabled()) {
							Aloha.Log.debug(that, 'hiding tab strip for tab ' + tab.label);
						}
						that.extTabPanel.hideTabStripItem(tab.extPanel);
					}
				}

				// hide a tab
				if ( tab.label == that.hideTab ) {
					that.extTabPanel.hideTabStripItem(tab.extPanel);

					if ( activeExtTab.title == that.hideTab ) {
						showUserActivatedTab = firstVisibleTab;
					}
				}
			}