function( type, element, options ) {
      this.attr = {};

      // choose random attrs instead of timestamp ones
      this.attr.me = ((Math.random() * 10) + "").replace(/\D/g, '');
      this.attr.click_event_ns = "click." + this.attr.me;

      if (!options) options = {};

      options.trigger = 'manual';

      // call parent
      this.init( type, element, options );

      // setup our own handlers
      this.$element.on( 'click', this.options.selector, $.proxy(this.clickery, this) );

      // soon add click hanlder to body to close this element
      // will need custom handler inside here
    }