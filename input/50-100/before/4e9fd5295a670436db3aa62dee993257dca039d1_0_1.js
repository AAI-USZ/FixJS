function() {
      $('body').data(this.app._location_proxy.data_name, '#/zuh')
      equal(this.app._location_proxy.getLocation(), '#/zuh');
      this.app._location_proxy.setLocation('#/boosh');
      equal('#/boosh', this.app._location_proxy.getLocation());
    }