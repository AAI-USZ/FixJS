function() {
    $('p.toggle').click(mutiny.toggle_filter);
    $('input[name=filter]').click(mutiny.filter_all);
    mutiny.api_url = (mutiny_host+'/_api/v1/'+mutiny_network+'/'+mutiny_channel
                      ).replace(/#/g, '');
    mutiny.load_data(0);
  }