function (options) {
      if (this.element.midgardNotifications) {
        jQuery(this.element).data('midgardNotifications').create(options);
      }
    }