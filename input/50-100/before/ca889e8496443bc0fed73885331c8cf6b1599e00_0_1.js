function updateMiniMessageCounter() {
    var delta = 140 - $('textarea.jsMiniMessageText').val().length;
    var miniMessageCounter = $('.miniMessageCounter');
    miniMessageCounter.text(delta);
    miniMessageCounter.toggleClass('warning', delta < 5);
    if (delta < 0) {
      $('.jsWriteMiniMessageButton').attr('disabled', 'disabled');
    } else {
      $('.jsWriteMiniMessageButton').removeAttr('disabled');
    }
  }