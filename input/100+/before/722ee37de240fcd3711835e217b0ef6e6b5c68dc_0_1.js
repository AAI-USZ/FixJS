function(jqXHR, status, errorThrown) {
        mutiny.running -= 1;
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