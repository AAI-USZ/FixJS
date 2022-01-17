function(parent) {
  $(parent).find('table thead .multi_select_column').each(function(index, thead) {
    if (!$(thead).find(':checkbox').length &&
        $(thead).parents('table').find('tbody :checkbox').length) {
      $(thead).append('<input type="checkbox">');
    }
  });
}