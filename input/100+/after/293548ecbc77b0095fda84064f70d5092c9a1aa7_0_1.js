function (elem) {
    var currStyle = document.defaultView.getComputedStyle(elem, null);
    var re = /matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([^,]+),[^\)]+\)/;
    var props = Monocle.Browser.css.toDOMProps('transform');
    var matrix = null;
    while (props.length && !matrix) {
      matrix = currStyle[props.shift()];
    }
    return parseInt(matrix.match(re)[1]);
  }