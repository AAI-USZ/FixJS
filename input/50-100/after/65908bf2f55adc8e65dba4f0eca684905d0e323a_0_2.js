function() {
    var width = document.width || window.outerWidth;
    var height = document.height || window.outerHeight;
    document.getElementById('dimensions').innerHTML = width + 'px x ' + height + 'px<br>' + ( width / this.findEmSize() ).toPrecision(4) + 'em x ' + ( height / this.findEmSize() ).toPrecision(4) + 'em';
  }