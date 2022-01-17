function(){
    var popover = this.popover;
    var top = this.getPosition();

    if (top < 0) {
      popover.removeClass('top').addClass('bottom');
      this.pos = 'bottom';
      top = this.getPosition();
    } else if (top + popover.offsetHeight + this.options.arrowHeight > this.getScrollElement().scrollHeight) {
      popover.removeClass('bottom').addClass('top');
      this.pos = 'top';
      top = this.getPosition();
    }

    this.popover.setStyle('top', top);
  }