function(timeout) {
    if (mutiny.running > 0) return;
    mutiny.running += 1;
    $.ajax({
      url: mutiny.api_url,
      timeout: (timeout+10) * 1000,
      dataType: 'json',
      data: {
        'a': 'log',
        'seen': mutiny.seen,
        'timeout': timeout
      },
      success: function(data) {
        mutiny.running -= 1;
        mutiny.retry = 1;
        mutiny.render(data);
        $('#disconnected').hide();
      },
      error: function(jqXHR, stat, errThrown) {
        mutiny.running -= 1;
        setTimeout('mutiny.load_data(0);', 1000 * mutiny.retry);
        if (mutiny.retry > 2) {
          for (var i = 1; i <= mutiny.retry; i++) {
            setTimeout('$("#countdown").html('+i+');', 1000 * (mutiny.retry-i));
          }
          setTimeout('$("#disconnected").hide();', (1000 * mutiny.retry) - 250);
          $('#disconnected').show();
        }
        if (stat == 'timeout') {
          mutiny.retry = mutiny.retry + 1;
          if (mutiny.retry > mutiny.max_retry_timeout) {
            mutiny.retry = mutiny.max_retry_timeout;
          }
        }
        else {
          if (errThrown) {
            mutiny.retry = mutiny.retry * 2;
            $('#debug_log').prepend($('<p/>').html('Error: '+stat+' '+errThrown));
          }
          if (mutiny.retry > mutiny.max_retry) {
            mutiny.retry = mutiny.max_retry;
          }
        }
      }
    });
  }