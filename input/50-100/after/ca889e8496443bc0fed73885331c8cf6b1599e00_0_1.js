function updateMiniMessageCounter() {
    var delta = 140 - $('.jsNewMiniMessage textarea.jsMiniMessageText').val().length;
    var miniMessageCounter = $('.jsNewMiniMessage .miniMessageCounter');
    miniMessageCounter.text(delta);
    miniMessageCounter.toggleClass('warning', delta < 5);
    if (delta < 0) {
      $('.jsWriteMiniMessageButton').attr('disabled', 'disabled');
    } else {
      $('.jsWriteMiniMessageButton').removeAttr('disabled');
    }
  }