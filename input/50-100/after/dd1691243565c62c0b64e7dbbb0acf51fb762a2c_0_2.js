function() {
    $('.fac-container').empty();
    $('.fac-container').
      css('display', 'block').
      css('position', 'absolute').
      css('left', $(this.input).offset().left).
      css('top', $(this.input).offset().top + $(this.input).outerHeight()).
      css('width', $(this.input).outerWidth());
  }