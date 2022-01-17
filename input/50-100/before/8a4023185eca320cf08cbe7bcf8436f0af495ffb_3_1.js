function(message, status) {
      if (status === 401) {
        $('#not-authenticated').removeClass('hidden');
      } else {
        // Other error.
        $('body').html(message);
      }
    }