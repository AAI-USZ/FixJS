function undoPop(AReport) {
  // restore previous report version from undo stack
  if (!undoAvailable()) {
    console.log('Undo not avalilable!');
    return AReport;
  }
  document.getElementById('items').innerHTML = 'Items: '+itemSelectedCount(AReport)+'/'+AReport.length;
  var r = undo.pop();
  current_item = itemFirstSelected(r);
  attributesShow(current_item);
  itemBind(r);
  return r;
}