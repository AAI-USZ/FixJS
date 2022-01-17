function uploadError() {
    $('#upload-progress').fadeOut();
    var error = $('#upload-error');
    error.fadeIn();
    $('#thesis-submit').removeClass('disabled')
    setInterval(function() {
      error.fadeOut();
    }, fadeInOutTime);
  }