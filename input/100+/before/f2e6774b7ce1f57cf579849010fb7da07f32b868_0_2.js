function(evt) {

      var isCurrentTab = this.currentTab.id === tab.id;
      switch (evt.type) {

      case 'mozbrowserloadstart':
        // iframe will call loadstart on creation, ignore
        if (!tab.url) {
          return;
        }
        tab.loading = true;
        if (isCurrentTab) {
          this.throbber.classList.add('loading');
          this.setUrlButtonMode(this.STOP);
        }
        tab.title = null;
        tab.iconUrl = null;
        break;

      case 'mozbrowserloadend':
        if (!tab.loading) {
          return;
        }
        tab.loading = false;
        if (isCurrentTab) {
          this.throbber.classList.remove('loading');
          this.urlInput.value = tab.title;
          this.setUrlButtonMode(this.REFRESH);
        }

        // We capture screenshots for everything when loading is
        // completed, but set background tabs inactive
        if (tab.dom.getScreenshot) {
          tab.dom.getScreenshot().onsuccess = (function(e) {
            tab.screenshot = e.target.result;
            if (!isCurrentTab) {
              this.setTabVisibility(tab, false);
            }
            if (this.currentScreen === this.TABS_SCREEN) {
              this.showTabScreen();
            }
          }).bind(this);
        }
        break;

      case 'mozbrowserlocationchange':
        if (evt.detail === 'about:blank') {
          return;
        }
        tab.url = evt.detail;
        this.updateHistory(evt.detail);
        if (isCurrentTab) {
          this.urlInput.value = tab.url;
        }
        break;

      case 'mozbrowsertitlechange':
        if (evt.detail) {
          tab.title = evt.detail;
          GlobalHistory.setPageTitle(tab.url, tab.title);
          if (isCurrentTab && !tab.loading) {
            this.urlInput.value = tab.title;
          }
          // Refresh the tab screen if we are currently viewing it, for dynamic
          // or not yet loaded titles
          if (this.currentScreen === this.TABS_SCREEN) {
            this.showTabScreen();
          }
        }
        break;

      case 'mozbrowsericonchange':
        if (evt.detail && evt.detail != tab.iconUrl) {
          tab.iconUrl = evt.detail;
          this.getIcon(tab.iconUrl, function(icon) {
            GlobalHistory.setPageIcon(tab.url, icon);
          });
        }
        break;

      case 'mozbrowsercontextmenu':
        this.showContextMenu(evt);
        break;
      }
    }