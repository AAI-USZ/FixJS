function show_bricks_of_hosts(event){
  var selected = $(selected_objects());
  if (selected.size() < 1) {
    show_error_dialog("対象がなにも選択されていません");
    return false;
  };
  window.location.href = '/ybz/brick/list/hosts/' + selected.get().join('-');
  return false;
}