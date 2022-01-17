function (activeLink) {
      this.$el.html(this.template({
        active: activeLink,
        navItems: this.navItems
      }));

      return this;
    }