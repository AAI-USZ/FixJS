function(whereTo) {
      var $currentTab, go_on, hash;
      if (0 > whereTo || whereTo >= this.numTabs) {
        return;
      }
      go_on = true;
      if (this.settings.callbacksBefore[whereTo] != null) {
        go_on = this.settings.callbacksBefore[whereTo]();
      }
      if (go_on !== false) {
        if (this.settings.useHistory) {
          $currentTab = $(this.$tabs[whereTo]);
          hash = $currentTab.find('a').attr('href').replace(/\#/, '');
          hasher.changed.active = false;
          hasher.setHash(hash);
          hasher.changed.active = true;
        }
        this.changeTab(whereTo);
        if (this.settings.callbacksAfter[whereTo] != null) {
          this.settings.callbacksAfter[whereTo]();
        }
      }
    }