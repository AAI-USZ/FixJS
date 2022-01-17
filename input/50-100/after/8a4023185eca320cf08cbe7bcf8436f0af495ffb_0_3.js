function(message, status) {
      if (typeof status !== 'undefined' && status >= 400 && status < 500) {
        var error = view.errorMessage.clone(true);

        error.removeClass('hide')
          .find('.alert-message')
          .text(message)
          .end()
          .appendTo('#error-box');

        window.setTimeout(function() {
          error.alert('close');
        }, 15000);
      } else {
        // Fatal error.
        $('html').html(message);
      }
    }