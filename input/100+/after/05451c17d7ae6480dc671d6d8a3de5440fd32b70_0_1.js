function() {
    window.delayedLinkTries = 0
    var dialog = $('#delayedlinknotice'),
        msg = $(this).attr('data-delayed-link-msg') || 'Hold on while we generate that file...',
        status = $('<div class="loading status"></div>').html(msg)
    if (dialog.length == 0) {
      dialog = $('<div id="delayedlinknotice"></div>')
      $(document.body).append(dialog)
    }
    dialog.html(status)
    dialog.dialog({modal: true, title: 'Hold on...'})
    checkDelayedLink($(this).attr('href'))
    return false
  }