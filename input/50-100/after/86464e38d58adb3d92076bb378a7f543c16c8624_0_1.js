function buildColorSquares() {
    var htmlItem = '',
      colors = module.options.colors,
      color;
    // sort by alphabet
    colors = sortByAlphabet(colors);

    for (color in colors) {
      if (colors.hasOwnProperty(color)) {
        htmlItem += '<li>' + colorSquare(colors[color], color) + '</li>';
      }
    }
    return '<ul class="debug-colors"><li>Platform colors:&nbsp;</li>' + htmlItem + '</ul>';
  }