function() {
    mutiny.load_data(0);
    $('p.toggle').click(mutiny.toggle_filter);
    $('input[name=filter]').click(mutiny.filter_all);
  }