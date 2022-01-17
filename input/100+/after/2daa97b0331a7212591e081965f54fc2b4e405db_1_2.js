function () {
  if (this.count() > 0) {
    var that = this;
    var hlen = this.count(), h;
    for (h = 0; h < hlen; h++) {
      var $tr = this.main.find('thead tr.' + this.headers[h].className);
      if (!$tr.length) {
        $tr = $('<tr class="' + this.headers[h].className + '"></tr>');
        this.main.find('thead').append($tr);
      }
      var tr = $tr[0];
      var ths = tr.childNodes;
      var thsLen = ths.length;
      var offset = this.instance.blockedCols ? this.instance.blockedCols.count() : 0;

      while (thsLen > this.instance.colCount + offset) {
        //remove excessive cols
        thsLen--;
        $(tr.childNodes[thsLen]).remove();
      }
      while (thsLen < this.instance.colCount + offset) {
        //add missing cols
        thsLen++;
        $tr.append('<th class="' + this.headers[h].className + '"></th>');
      }

      for (h = 0; h < hlen; h++) {
        var realThs = this.instance.table.find('thead th.' + this.headers[h].className);
        for (var i = 0; i < thsLen; i++) {
          realThs[i].innerHTML = ths[i].innerHTML = that.headers[h].columnLabel(i - offset);
          ths[i].style.minWidth = realThs.eq(i).width() + 'px';
        }
      }
    }

    this.ths = this.main.find('th');
    this.refreshBorders();
  }
}