function toggleCheck() {
  var checked = $("#check_all").attr("checked");
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