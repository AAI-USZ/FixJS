function lists_write_annotations(part)
{
  var id = parseInt($('#fliptabs li.act').attr('id').substring(7));

  if (!part || part == 'usr') {
    $('#usr>table>tbody td.annotation').html("");
    if (lists_ann_usr[id] != null)
      for (var i in lists_ann_usr[id])
        $('#row_usr'+i+'>td.annotation').html(lists_ann_usr[id][i]);
  }
  if (!part || part == 'knd') {
    $('#knd>table>tbody td.annotation').html("");
    if (lists_ann_knd[id] != null)
      for (var i in lists_ann_knd[id])
        $('#row_knd'+i+'>td.annotation').html(lists_ann_knd[id][i]);
  }
  if (!part || part == 'pct') {
    $('#pct>table>tbody td.annotation').html("");
    if (lists_ann_pct[id] != null)
      for (var i in lists_ann_pct[id])
        $('#row_pct'+i+'>td.annotation').html(lists_ann_pct[id][i]);
  }
  if (!part || part == 'evt') {
    $('#evt>table>tbody td.annotation').html("");
    if (lists_ann_evt[id] != null)
      for (var i in lists_ann_evt[id])
        $('#row_evt'+i+'>td.annotation').html(lists_ann_evt[id][i]);
  }
}