function () {
  var trs = this.instance.table.find('tbody')[0].childNodes;
  for (var r = 0; r < this.instance.rowCount; r++) {
    if (trs[r].getElementsByTagName('th').length === 0) {
      for (var i = 0, ilen = this.count(); i < ilen; i++) {
        var th = document.createElement('th');
        th.className = this.headers[i].className;
        trs[r].insertBefore(th, trs[r].firstChild);
      }
    }
  }
}