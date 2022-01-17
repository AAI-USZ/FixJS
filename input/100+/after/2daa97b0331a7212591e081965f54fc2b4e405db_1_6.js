function (changes) {
  if (this.count() > 0) {
    var trs = this.main[0].firstChild.getElementsByTagName('tbody')[0].childNodes;
    for (var i = 0, ilen = changes.length; i < ilen; i++) {
      var $th = $(this.instance.getCell(changes[i][0], changes[i][1]));
      if ($th.length) {
        trs[changes[i][0]].firstChild.style.height = $th[this.heightMethod]() + 'px';
      }
    }
  }
}