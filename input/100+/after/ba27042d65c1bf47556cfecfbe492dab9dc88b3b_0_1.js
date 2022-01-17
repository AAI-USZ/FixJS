function () {
  var $table = $(this),
      header_options = {};
  // Disable if not sortable or has <= 1 item
  if ($table.find('tbody tr').not('.empty').length > 1){
    $table.find("thead th").each(function (i, val) {
      $th = $(this);
      if (!$th.hasClass('sortable')) {
        header_options[i] = {sorter: false};
      } else if ($th.data('type') == 'size'){
        // set as [i-1] as there is one more <th> in <thead>
        // than <td>'s in <tbody>
        header_options[i-1] = {sorter: 'sizeSorter'};
      }
    });
    $table.tablesorter({
      headers: header_options,
      cancelSelection: false
    });
  }
}