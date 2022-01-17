function()
  {
    this.container = $('.container ul', this.element);
    this.width     = $('.container', this.element).width();
    this.elements  = $('.element',   this.element);
    this.perPage   = Math.ceil(this.width / this.elements.width());
    this.current   = this.current || 0;
    this.currentEl = $('.element').eq(this.current);
    this.elWidth   = this.elements.width();
    this.bullets   = $('.bullets', this.element);

    this.log('setup');

    $('.element', this.container).width( this.elWidth ).css('-webkit-backface-visibility', 'hidden');

    this.container.css({
      width: 100 + this.elements.length * this.elements.width() + 'px',
      overflow: (this.options.hideOverflow ? 'hidden' : 'visible')
    });

    // Prevent clicks on swiping
    if(this.options.touchSim) {
      var self = this;
      $(this.element).on('click', 'a', function(e){
        if($(self.element).hasClass('noclick')) {
          e.preventDefault();
        }
      });
    }

    // Automation
    if(this.options.auto) {
      this.begin();
    }
    if(this.options.resize) {
      this.slideTo(this.current);
    }
  }