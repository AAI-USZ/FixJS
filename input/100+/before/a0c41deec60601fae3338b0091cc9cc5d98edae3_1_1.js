function (changes) {
  var offset = this.instance.blockedRows ? this.instance.blockedRows.count() : 0;
  for (var i = 0, ilen = changes.length; i < ilen; i++) {
    var $th = $(this.instance.getCell(changes[i][0], changes[i][1]));
    if ($th.length) {
      this.ths.get(changes[i][0] + offset).style.height = $th[this.heightMethod]() + 'px';
    }
  }
}