function lists_write_annotations(part)
{
  var id = parseInt($('#fliptabs li.act').attr('id').substring(7));

  if (!part || part == 'user') {
    $('#user>table>tbody td.annotation').html("");
    if (lists_user_annotations[id] != null)
      for (var i in lists_user_annotations[id])
        $('#row_user'+i+'>td.annotation').html(lists_user_annotations[id][i]);
  }
  if (!part || part == 'customer') {
    $('#customer>table>tbody td.annotation').html("");
    if (lists_customer_annotations[id] != null)
      for (var i in lists_customer_annotations[id])
        $('#row_customer'+i+'>td.annotation').html(lists_customer_annotations[id][i]);
  }
  if (!part || part == 'project') {
    $('#project>table>tbody td.annotation').html("");
    if (lists_project_annotations[id] != null)
      for (var i in lists_project_annotations[id])
        $('#row_project'+i+'>td.annotation').html(lists_project_annotations[id][i]);
  }
  if (!part || part == 'activity') {
    $('#activity>table>tbody td.annotation').html("");
    if (lists_activity_annotations[id] != null)
      for (var i in lists_activity_annotations[id])
        $('#row_activity'+i+'>td.annotation').html(lists_activity_annotations[id][i]);
  }
}