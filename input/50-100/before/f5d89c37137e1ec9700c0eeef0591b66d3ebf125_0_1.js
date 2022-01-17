function (i, val) {
    // Disable if not sortable or has <= 1 item
    if (!$(this).hasClass('sortable') ||
        $this.find('tbody tr').not('.empty').length <= 1) {
      options[i] = {sorter: false};
    }
  }