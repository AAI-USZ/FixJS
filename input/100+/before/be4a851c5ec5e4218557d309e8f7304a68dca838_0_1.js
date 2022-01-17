function jqTabs($tabsContainer, options) {
      var self;
      this.$tabsContainer = $tabsContainer;
      this.makeContent = __bind(this.makeContent, this);

      this.seek = __bind(this.seek, this);

      this.changeTab = __bind(this.changeTab, this);

      self = this;
      $.extend(this.settings, options);
      if (this.settings.useHistory && !(typeof hasher !== "undefined" && hasher !== null)) {
        this.settings.useHistory = false;
      }
      if (!this.settings.tabsClickable) {
        this.settings.useHistory = false;
      }
      this.updateElements();
      this.numTabs = this.$tabContent.length;
      $(this.$tabs[0]).addClass(this.settings.activeClass);
      this.$tabContent.addClass(this.settings.hiddenClass);
      $(this.$tabContent[0]).removeClass(this.settings.hiddenClass);
      $('ul.tab-headers', $tabsContainer).on('click', 'li', function(e) {
        var $goToTab, toTab;
        e.preventDefault();
        if (self.settings.tabsClickable) {
          $goToTab = $(this);
          if (!$goToTab.hasClass(self.settings.activeClass)) {
            toTab = $goToTab.index(this.$tabs);
            return self.seek(toTab);
          }
        }
      });
      if (this.settings.useHistory) {
        this.setHashChange();
      }
    }