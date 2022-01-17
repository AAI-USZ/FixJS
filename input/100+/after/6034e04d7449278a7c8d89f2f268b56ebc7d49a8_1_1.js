function(){
    var element = this.getScrollElement();
    var popover = this.popover;
    var top = this.getPosition();

    if (top < 0 || top < element.scrollTop) {
      this.toggle('bottom');
      top = this.getPosition();
    } else if (top + popover.offsetHeight + this.options.arrowHeight > element.scrollHeight) {
      this.toggle('top');
      top = this.getPosition();
    }

    this.popover.setStyle('top', top);
  }