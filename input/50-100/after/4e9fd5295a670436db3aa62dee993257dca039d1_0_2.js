function() {
      $.removeData($('body')[0], this.app._location_proxy.data_name);
      equal($('body').data(this.app._location_proxy.data_name), null);
      equal(this.app._location_proxy.getLocation(), '');
    }