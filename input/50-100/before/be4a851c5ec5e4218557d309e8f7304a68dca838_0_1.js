function(e) {
        var $goToTab, toTab;
        e.preventDefault();
        if (self.settings.tabsClickable) {
          $goToTab = $(this);
          if (!$goToTab.hasClass(self.settings.activeClass)) {
            toTab = $goToTab.index(this.$tabs);
            return self.seek(toTab);
          }
        }
      }