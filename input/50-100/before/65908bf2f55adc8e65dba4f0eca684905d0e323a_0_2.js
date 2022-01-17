function() {
    document.getElementById('dimensions').innerHTML = document.width + 'px x ' + document.height + 'px<br>' + ( document.width / this.findEmSize() ).toPrecision(4) + 'em x ' + ( document.height / this.findEmSize() ).toPrecision(4) + 'em';
  }