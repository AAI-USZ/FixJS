function(e) {
        var target, toTab;
        e.preventDefault();
        if (_this.settings.tabsClickable) {
          target = $(e.currentTarget);
          if (!target.hasClass(_this.settings.activeClass)) {
            toTab = _this.$tabs.index(target);
            return _this.seek(toTab);
          }
        }
      }