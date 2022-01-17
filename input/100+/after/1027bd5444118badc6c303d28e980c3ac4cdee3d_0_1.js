function(i, speed)
  {
    speed = typeof speed != 'undefined' ? speed : this.options.speed;
    //i = (i % this.elements.length) * this.perPage
    i = (i % this.elements.length)

    this.log('slideTo', i, speed);
    this.events.change(this.element);

    //if(i >= this.elements.length || i < 0) return;

    this.currentEl = this.elements.eq(i);
    this.current   = this.currentEl.index();
    var to = -(this.current * this.elWidth);

    // Animation
    if(this.options.transformSupport) {
      var style = this.container.get(0).style;
      style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + 'ms';
      style.webkitTransform = 'translate3d(' + to + 'px, 0, 0)';
      style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + to + 'px)';
      if(!speed) this.transitionEnd();
    }
    else {
      var self = this;
      this.container.animate({
        'margin-left': to + 'px'
      }, speed, function(){
        self.transitionEnd();
      });
    }

    // Controls
    $('.next .prev', this.element).removeClass('off');

    if(this.current == 0) {
      $('.prev', this.element).addClass('off');
    }
    else if(this.current == this.elements.length - 1) {
      $('.next', this.element).addClass('off');
    }

    if(this.options.bullets) {
      $('.on', this.bullets).removeClass('on');
      $('.bullet:eq(' + this.current + ')', this.bullets).addClass('on');
    }
  }