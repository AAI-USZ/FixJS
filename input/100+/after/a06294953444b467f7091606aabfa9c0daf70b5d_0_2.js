function IE_diff_mode(item){
  var patch = JsDiff.createPatch(item.attr('data-file-name'), $('#old').text(), $('#new').text());
  item.val(patch);
  item.attr('readOnly', true);
}