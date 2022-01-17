function Plugin( element, options ) {

    this.element = element;

    this.options = $.extend( {}, defaults, options);



    this._defaults = defaults;

    this._name = pluginName;



    this.increment = this.options.increment;

    this.speed = this.options.speed;

    this.tickerBuffer = this.options.tickerBuffer;

    this.tickerWidth = this.options.width;

    this.tickerHeight = this.options.height;

    this.scroll = this.options.scroll;



    // captialise the scroll to use for function names

    this.scroll = this.scroll.charAt(0).toUpperCase() + this.scroll.slice(1);



    this.dimensions = {

    	itemMaxWidth : 0,

    	itemMaxHeight : 0,

    	tickerTapeLength : 0,

    };



    this.currPos = 0;

    this.tickerInterval = 0;

    this.firstItemWidth = 0;



		// do something interesting

    this.init();

  }