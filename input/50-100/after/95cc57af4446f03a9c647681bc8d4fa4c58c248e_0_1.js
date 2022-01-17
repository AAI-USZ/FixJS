function toggleCheck() {
  var checked = $("#check_all").is(':checked');
  $('.host_select_boxes').each(function(index, box) {
    box.checked = checked;
    hostChecked(box);
  });
  if(!checked)
  {
     cleanHostsSelection();
  }
  return false;
}