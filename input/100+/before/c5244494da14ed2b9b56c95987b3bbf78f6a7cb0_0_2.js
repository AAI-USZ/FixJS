function(timeout) {
    var api_url = (mutiny_host+'/_api/v1/'+mutiny_network+'/'+mutiny_channel
                   ).replace(/#/g, '');
    $.getJSON(api_url, {
      'a': 'log',
      'uid': mutiny_uid,
      'seen': mutiny.seen,
      'timeout': timeout
    }, function(data, textStatus, jqXHR) {
      mutiny.retry = 1;
      mutiny.render(data);
      $('#disconnected').hide();
    }).error(function() {
      setTimeout('mutiny.load_data();', 1000 * mutiny.retry);
      if (mutiny.retry > 2) {
        for (var i = 1; i <= mutiny.retry; i++) {
          setTimeout('$("#countdown").html('+i+');', 1000 * (mutiny.retry-i));
        }
        $('#disconnected').show();
      }
      mutiny.retry = mutiny.retry * 2;
      if (mutiny.retry > mutiny.max_retry)
        mutiny_retry = mutiny.max_retry;
    });
  }