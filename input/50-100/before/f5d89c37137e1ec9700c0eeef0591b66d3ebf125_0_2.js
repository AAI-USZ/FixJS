function () {
  var $this = $(this),
      options = {};
  $this.find("thead th").each(function (i, val) {
    // Disable if not sortable or has <= 1 item
    if (!$(this).hasClass('sortable') ||
        $this.find('tbody tr').not('.empty').length <= 1) {
      options[i] = {sorter: false};
    }
  });
  $this.tablesorter({
    headers: options
  });
}