function () {
  var hlen = this.count(), h, th, realTh, i, label;
  if (hlen > 0) {
    var $tbody = this.main.find('tbody');
    var tbody = $tbody[0];
    var trs = tbody.childNodes;
    var trsLen = trs.length;
    while (trsLen > this.instance.rowCount) {
      //remove excessive rows
      trsLen--;
      $(tbody.childNodes[trsLen]).remove();
    }

    var realTrs = this.instance.table.find('tbody tr');
    for (i = 0; i < trsLen; i++) {
      for (h = 0; h < hlen; h++) {
        label = this.headers[h].columnLabel(i);
        realTh = realTrs[i].getElementsByClassName ? realTrs[i].getElementsByClassName(this.headers[h].className)[0] : $(realTrs[i]).find('.' + this.headers[h].className.replace(/\s/i, '.'))[0];
        realTh.innerHTML = label;
        th = trs[i].getElementsByClassName ? trs[i].getElementsByClassName(this.headers[h].className)[0] : $(trs[i]).find('.' + this.headers[h].className.replace(/\s/i, '.'))[0];
        th.innerHTML = label;
        this.instance.minWidthFix(th);
        th.style.height = $(realTh)[this.heightMethod]() + 'px';
      }
    }

    this.ths = this.main.find('th:last-child');
    this.refreshBorders();
  }
}