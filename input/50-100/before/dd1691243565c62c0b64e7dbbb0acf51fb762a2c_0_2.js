function() {
    $('.fac-container').empty();
    $('.fac-container').
      css('display', 'block').
      css('position', 'absolute').
      css('left', $(this.input).position().left).
      css('top', $(this.input).position().top + $(this.input).outerHeight()).
      css('width', $(this.input).outerWidth());
  }