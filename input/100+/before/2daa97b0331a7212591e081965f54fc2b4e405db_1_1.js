function () {
  var tr, c;
  this.instance.table.find('thead').empty();
  var headerCount = this.count();
  var offset = this.instance.blockedCols ? this.instance.blockedCols.count() : 0;
  for (var h = 0; h < headerCount; h++) {
    tr = document.createElement('tr');
    tr.className = this.headers[h].className;
    for (c = 0; c < this.instance.colCount + offset; c++) {
      var th = document.createElement('th');
      th.className = this.headers[h].className;
      th.innerHTML = '&nbsp;<span class="small">&nbsp;</span>&nbsp;';
      tr.appendChild(th);
    }
    this.instance.table.find('thead').append(tr);
  }
}