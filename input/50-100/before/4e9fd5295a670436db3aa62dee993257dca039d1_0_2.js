function() {
      $.removeData($('body')[0], this.app._location_proxy.data_name);
      equal(null, $('body').data(this.app._location_proxy.data_name));
      equal('', this.app._location_proxy.getLocation());
    }