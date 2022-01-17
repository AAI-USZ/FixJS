function(message, status) {
      var error = view.errorMessage.clone(true);

      $('#error-box').empty();
      error.removeClass('hide')
        .find('.alert-message')
        .text(message)
        .end()
        .appendTo('#error-box');

      window.setTimeout(function() {
        error.alert('close');
      }, 20000);
    }