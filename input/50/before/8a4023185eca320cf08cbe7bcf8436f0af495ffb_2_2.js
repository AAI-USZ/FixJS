function(message, status) {
        if (status === 401) {
          // Logget out.
          callback();
        } else {
          // Other error.
          $('body').html(message);
        }
      }