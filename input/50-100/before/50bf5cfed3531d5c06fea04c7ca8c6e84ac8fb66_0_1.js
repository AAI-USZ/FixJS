function thesisSubmited() {
    $('#upload-progress .bar').width('100%');
    var status = $('#upload-status');
    $("#upload").modal('hide');
    status.fadeIn();
    $('#thesis-upload').resetForm();
    $('#thesis-submit').removeClass('disabled')
    $('#upload-progress').hide();
    setInterval(function() {
      status.fadeOut();
    }, 8000);
  }