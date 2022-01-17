function jqTabs($tabsContainer, options) {
      var _this = this;
      this.$tabsContainer = $tabsContainer;
      this.makeContent = __bind(this.makeContent, this);

      this.seek = __bind(this.seek, this);

      this.changeTab = __bind(this.changeTab, this);

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
        var target, toTab;
        e.preventDefault();
        if (_this.settings.tabsClickable) {
          target = $(e.currentTarget);
          if (!target.hasClass(_this.settings.activeClass)) {
            toTab = _this.$tabs.index(target);
            return _this.seek(toTab);
          }
        }
      });
      if (this.settings.useHistory) {
        this.setHashChange();
      }
    }