function(el, options, events)
  {
    this.element = $(el);
    this.options = $.extend({
      debug:            false,
      auto:             false,
      resize:           false,
      touch:            true,
      touchSim:         true,
      infinite:         false,
      speed:            300,
      delay:            4000,
      hideOverflow:     true,
      bullets:          true,
      transformSupport: (typeof Modernizr != 'undefined' ? (Modernizr.csstransforms && Modernizr.csstransitions) : false)
    }, options);

    this.events = $.extend({
      change:  function(el) { return false; },
      changed: function(el) { return false; }
    }, this.options.events);

    // Windows Chrome bug
    if(/win/.test(navigator.userAgent.toLowerCase()) && /chrome/.test(navigator.userAgent.toLowerCase())) {
      this.options.transformSupport = false;
    }

    this.element.bind('destroyed', $.proxy(this.destroy, this));

    $.data(el, this.name, this); // Store instance to element data for great justice

    this.log('init', options, events, (this.options.transformSupport ? 'using transform' : 'using margin-left'));

    this.setup();

    var self = this;
    function resizeTimer(){
      clearInterval(self.timer);
      self.reset();
      self.setup();
    };

    if(this.options.resize) $(window).on('resize', function(){
      if(self.timer) clearInterval(self.timer);
      self.timer = setInterval(resizeTimer, 250);
    });

    this.initEvents();
  }