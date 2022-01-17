function insert(f, textID) {
  var obj = document.getElementById(textID);

  if (document.selection) {
    var str = document.selection.createRange().text;
    obj.focus();
    var sel = document.selection.createRange();
    sel.text = f;
  } else {
    var len = obj.value.length;
    var start = obj.selectionStart;
    var end = obj.selectionEnd;
    var sel = obj.value.substring(start, end);
    obj.value = obj.value.substring(0, start) + f + obj.value.substring(end, len);
    obj.selectionStart = start + f.length;
    obj.selectionEnd = start + f.length;
  }
  obj.focus();
}