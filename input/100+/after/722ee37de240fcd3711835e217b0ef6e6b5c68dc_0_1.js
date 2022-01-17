function(jqXHR, stat, errThrown) {
        mutiny.running -= 1;
        setTimeout('mutiny.load_data(0);', 1000 * mutiny.retry);
        if (mutiny.retry > 2) {
          for (var i = 1; i <= mutiny.retry; i++) {
            setTimeout('$("#countdown").html('+i+');', 1000 * (mutiny.retry-i));
          }
          setTimeout('$("#disconnected").hide();', (1000 * mutiny.retry) - 250);
          $('#disconnected').show();
        }
        mutiny.retry = mutiny.retry * 2;
        if (stat == 'timeout') {
          if (mutiny.retry > mutiny.max_retry_timeout)
            mutiny.retry = mutiny.max_retry_timeout;
        }
        else {
          if (errThrown) {
            $('#debug_log').prepend($('<p/>').html('Error: '+stat+' '+errThrown));
            if (mutiny.retry > mutiny.max_retry)
              mutiny_retry = mutiny.max_retry;
          }
        }
      }