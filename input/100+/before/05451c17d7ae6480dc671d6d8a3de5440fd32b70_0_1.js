function() {
    window.delayedLinkTries = 0
    var dialog = $('#delayedlinknotice')
    if (dialog.length == 0) {
      dialog = $('<div id="delayedlinknotice"><div class="loading status">Hold on while we generate that file...</div></div>')
      $(document.body).append(dialog)
    }
    dialog.dialog({modal: true, title: 'Hold on...'})
    checkDelayedLink($(this).attr('href'))
    return false
  }