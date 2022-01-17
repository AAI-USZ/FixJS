function (changes) {
  var offset = this.instance.blockedCols ? this.instance.blockedCols.count() : 0;
  for (var i = 0, ilen = changes.length; i < ilen; i++) {
    var $th = $(this.instance.getCell(changes[i][0], changes[i][1]));
    if ($th.length) {
      var width = $th.width();
      this.main.find('th').get(changes[i][1] + offset).style.minWidth = width + 'px';
    }
  }
}