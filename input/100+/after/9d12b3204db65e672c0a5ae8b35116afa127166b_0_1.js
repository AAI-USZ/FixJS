function DatePicker( element, options ) {
    this.$el = $(element);
    this.proxy('show').proxy('ahead').proxy('hide').proxy('keyHandler').proxy('selectDate');
    
    if(typeof options == undefined) options = {};
    
    
    options = $.extend({}, $.fn.datepicker.defaults, options );
    
    if((!!options.parse) || (!!options.format) || !this.detectNative()) {
      $.extend(this, options);

      this.$el.data('datepicker', this);
      all.push(this);
      this.init();
    }
  }