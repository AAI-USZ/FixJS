function()
  {
    this.log('initEvents');
    var self = this;

    // Controls
    $('.next', this.element).on('click', function(e){
      e.preventDefault();
      self.next();
    });

    $('.prev', this.element).on('click', function(e){
      e.preventDefault();
      self.previous();
    });

    // Touch
    if(this.options.touch && 'addEventListener' in window) {
      var cont = this.container.get(0);
      cont.addEventListener('touchstart', function(e){ self.touchStart(e); }, false);
      cont.addEventListener('touchmove',  function(e){ self.touchMove(e); },  false);
      cont.addEventListener('touchend',   function(e){ self.touchEnd(e); },   false);
    }

    if(this.options.touchSim) {
      $(this.container).on('mousedown', function(e){ self.mouseDown(e); });
    }

    if(this.options.transformSupport) {
      $(this.container).on('webkitTransitionEnd msTransitionEnd oTransitionEnd transitionEnd', function(e){
        self.transitionEnd();
      });
    }

    // Bullets
    if(this.bullets) {
      $(this.bullets).on('click', '.bullet', function(e){
        e.preventDefault();
        self.slideTo($(this).index());
      });
    }
  }