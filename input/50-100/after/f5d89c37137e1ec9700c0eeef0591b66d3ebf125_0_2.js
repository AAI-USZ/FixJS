function () {
  var $this = $(this),
      header_options = {};
  $this.find("thead th").each(function (i, val) {
    // Disable if not sortable or has <= 1 item
    if (!$(this).hasClass('sortable') || $this.find('tbody tr').not('.empty').length <= 1) {
      header_options[i] = {sorter: false};
    }
  });
  $this.tablesorter({
    headers: header_options,
    cancelSelection: false
  });
}