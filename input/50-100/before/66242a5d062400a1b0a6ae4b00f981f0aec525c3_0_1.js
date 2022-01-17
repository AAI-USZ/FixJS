function(e) {
            tab.screenshot = e.target.result;
            if (!isCurrentTab) {
              this.setTabVisibility(tab, false);
            }
            if (this.currentScreen === this.TABS_SCREEN) {
              this.showTabScreen();
            }
          }