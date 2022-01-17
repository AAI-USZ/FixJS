function(timeout) {
    $.ajax({
      url: mutiny.api_url,
      timeout: (mutiny.refresh+2) * 1000,
      dataType: 'json',
      data: {
        'a': 'log',
        'uid': mutiny_uid,
        'seen': mutiny.seen,
        'timeout': timeout
      },
      success: function(data) {
        mutiny.retry = 1;
        mutiny.render(data);
        $('#disconnected').hide();
      },
      error: function(jqXHR, status, errorThrown) {
        setTimeout('mutiny.load_data(0);', 1000 * mutiny.retry);
        if (mutiny.retry > 2) {
          for (var i = 1; i <= mutiny.retry; i++) {
            setTimeout('$("#countdown").html('+i+');', 1000 * (mutiny.retry-i));
          }
          $('#disconnected').show();
        }
        mutiny.retry = mutiny.retry * 2;
        if (mutiny.retry > mutiny.max_retry)
          mutiny_retry = mutiny.max_retry;
      }
    });
  }