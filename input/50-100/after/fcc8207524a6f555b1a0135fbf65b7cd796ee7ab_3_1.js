function onZoomDone() {
      $canvas.css({ 'transform': null });
      $tabEl.removeClass("front");

      UI.goToTab(tab);

      // tab might not be selected because hideTabView() is invoked after 
      // UI.goToTab() so we need to setup everything for the gBrowser.selectedTab
      if (tab != gBrowser.selectedTab) {
        UI.onTabSelect(gBrowser.selectedTab);
      } else { 
        if (isNewBlankTab)
          gWindow.gURLBar.focus();
      }
      if (self.parent && self.parent.expanded)
        self.parent.collapse();

      self._sendToSubscribers("zoomedIn");
    }