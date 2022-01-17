function TabItem_zoomIn(isNewBlankTab) {
    // don't allow zoom in if its group is hidden
    if (this.parent && this.parent.hidden)
      return;

    let self = this;
    let $tabEl = this.$container;
    let $canvas = this.$canvas;

    Search.hide();

    UI.setActive(this);
    TabItems._update(this.tab, {force: true});

    // Zoom in!
    let tab = this.tab;

    function onZoomDone() {
      $canvas.css({ '-moz-transform': null });
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

    let animateZoom = gPrefBranch.getBoolPref("animate_zoom");
    if (animateZoom) {
      let transform = this.getZoomTransform();
      TabItems.pausePainting();

      if (this.parent && this.parent.expanded)
        $tabEl.removeClass("stack-trayed");
      $tabEl.addClass("front");
      $canvas
        .css({ '-moz-transform-origin': transform.transformOrigin })
        .animate({ '-moz-transform': transform.transform }, {
          duration: 230,
          easing: 'fast',
          complete: function() {
            onZoomDone();

            setTimeout(function() {
              TabItems.resumePainting();
            }, 0);
          }
        });
    } else {
      setTimeout(onZoomDone, 0);
    }
  }