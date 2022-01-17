function (options) {
      if (this.element.midgardNotifications) {
        return jQuery(this.element).data('midgardNotifications').create(options);
      }
    }