function(name) {
    var oldCurrent = this.currentCassette;
    this.currPage = 1;

    // Find the specified cassette, or if it was null set the cassette
    // to null, 'ejecting' it.
    if (typeof(name) == "undefined" ||
        name == null ||
        name.length == 0) {
      this.currentCassette = null;
    }
    else {
      for (var i = 0; i < this.cassettes.length; i++) {
        var cassette = this.cassettes[i].cassette;
        if (cassette.get("name") == name) {
          this.currentCassette = cassette;
          this.currentCassette.set({ active: "active" });

          if (typeof(this.cassettes[i].page) != "undefined") {
            this.currPage = parseInt(this.cassettes[i].page);
          }
        }
      }
    }

    // If the current cassette changes, we need to save the new
    // cassette's id and update the browse region.
    if (this.currentCassette != oldCurrent) {
      // Change the current cassette
      var cassetteName = "";
      if (this.currentCassette != null) {
        cassetteName = this.currentCassette.get("name")
      }
      if(oldCurrent != null) {
        oldCurrent.unset("active");
      }
      Tapedeck.Backend.Bank.saveCurrentCassette(cassetteName);

      this.log("Switching to cassette: '" + cassetteName + "'");

      // Push the new view
      Tapedeck.Backend.MessageHandler.getSelectedTab(function(selectedTab) {
        Tapedeck.Backend.TemplateManager.renderView("BrowseRegion", function(browseRegionView) {
          Tapedeck.Backend.MessageHandler.pushView(browseRegionView.el,
                                                   browseRegionView.proxyEvents);
        }, true);
      });
    }
  }