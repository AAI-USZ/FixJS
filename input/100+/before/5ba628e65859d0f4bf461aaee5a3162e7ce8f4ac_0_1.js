function () {
			if (Aloha.Log.isDebugEnabled()) {
				Aloha.Log.debug(this, 'doLayout called for FloatingMenu, scope is ' + this.currentScope);
			}

			var that = this,
				firstVisibleTab = false,
				activeExtTab = this.extTabPanel.getActiveTab(),
				activeTab = false,
				floatingMenuVisible = false,
				showUserActivatedTab = false,
				pos;

			// let the tabs layout themselves
			jQuery.each(this.tabs, function(index, tab) {
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
			});

			// check whether the last tab which was selected by the user is visible and not the active tab
			if (showUserActivatedTab) {
				if (Aloha.Log.isDebugEnabled()) {
					Aloha.Log.debug(this, 'Setting active tab to ' + showUserActivatedTab.label);
				}
				this.extTabPanel.setActiveTab(showUserActivatedTab.extPanel);
			} else if (typeof activeTab === 'object' && typeof firstVisibleTab === 'object') {
				// now check the currently visible tab, whether it is visible and enabled
				if (!activeTab.visible) {
					if (Aloha.Log.isDebugEnabled()) {
						Aloha.Log.debug(this, 'Setting active tab to ' + firstVisibleTab.label);
					}
					this.autoActivatedTab = firstVisibleTab.extPanel.title;
					this.extTabPanel.setActiveTab(firstVisibleTab.extPanel);
				}
			}

			// set visibility of floatingmenu
			if (floatingMenuVisible && this.extTabPanel.hidden) {
				// set the remembered position
				this.extTabPanel.show();
				this.refreshShadow();
				this.extTabPanel.shadow.show();
				this.extTabPanel.setPosition(this.left, this.top);
			} else if (!floatingMenuVisible && !this.extTabPanel.hidden) {
				// remember the current position
				pos = this.extTabPanel.getPosition(true);
				// restore previous position if the fm was pinned
				this.left = pos[0] < 0 ? 100 : pos[0];
				this.top = pos[1] < 0 ? 100 : pos[1];
				this.extTabPanel.hide();
				this.extTabPanel.shadow.hide();
			}

			// let the Ext object render itself again
			this.extTabPanel.doLayout();
		}