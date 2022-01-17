function thesisSubmited() {
    $('#upload-progress .bar').width('100%');
    $("#upload").modal('hide');
    var status = $('#upload-status');
    status.fadeIn();
    $('#thesis-upload').resetForm();
    $('#thesis-submit').removeClass('disabled');
    $('#upload-progress').hide();
    setInterval(function() {
      status.fadeOut();
    }, fadeInOutTime);
  }