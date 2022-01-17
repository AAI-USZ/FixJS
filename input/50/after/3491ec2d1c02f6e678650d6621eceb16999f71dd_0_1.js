function (activeLink) {
      this.$el.html(this.template({
        activeLink: activeLink,
        navItems: this.navItems
      }));

      return this;
    }