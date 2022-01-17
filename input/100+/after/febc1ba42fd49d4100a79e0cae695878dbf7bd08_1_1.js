function () {
  if (this.count() > 0) {
    var that = this;
    var hlen = this.count(), h;
    var $theadTr = this.main.find('thead tr');
    var offset = this.instance.blockedRows ? this.instance.blockedRows.count() : 0;
    if (offset && $theadTr[0].childNodes.length < hlen) {
      for (h = 0; h < hlen; h++) {
        var th = $theadTr[0].getElementsByClassName(that.headers[h].className)[0];
        if (!th) {
          th = document.createElement('th');
          th.className = this.headers[h].className;
          th.innerHTML = '&nbsp;<span class="small">&nbsp;</span>&nbsp;';
          $theadTr[0].insertBefore(th, $theadTr[0].firstChild);
        }
      }
    }
    else if (!offset && $theadTr[0].childNodes.length > 0) {
      $theadTr.empty();
    }

    var $tbody = this.main.find('tbody');
    var tbody = $tbody[0];
    var trs = tbody.childNodes;
    var trsLen = trs.length;
    while (trsLen > this.instance.rowCount) {
      //remove excessive rows
      trsLen--;
      $(tbody.childNodes[trsLen]).remove();
    }
    while (trsLen < this.instance.rowCount) {
      //add missing rows
      trsLen++;
      for (h = 0; h < hlen; h++) {
        $tbody.append('<tr></tr>');
      }
    }

    var realTrs = this.instance.table.find('tbody tr');
    for (var i = 0; i < trsLen; i++) {
      for (h = 0; h < hlen; h++) {
        var th = trs[i].getElementsByClassName(that.headers[h].className)[0];
        if (!th) {
          th = document.createElement('th');
          th.className = this.headers[h].className;
          trs[i].insertBefore(th, trs[i].firstChild);
        }
        th.innerHTML = that.headers[h].columnLabel(i);
        th.style.height = realTrs.eq(i).children().first()[this.heightMethod]() + 'px';
      }
    }

    this.ths = this.main.find('th:last-child');
    this.refreshBorders();
  }
}