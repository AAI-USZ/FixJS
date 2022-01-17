function( type, element, options ) {
      this.attr = {};

      // setup event ns space to safely remove the click hanlder
      this.attr.me = +(new Date); // IE 8 doesn't like Date.now();
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