function() {
    var blockjQ = this.jQ.children(':eq(1)');

    var height = blockjQ.outerHeight()/+blockjQ.css('fontSize').slice(0,-2);

    var parens = this.children('.paren');
    scale(paren, min(1 + .2*(height - 1), 1.2), 1.05*height);
  }