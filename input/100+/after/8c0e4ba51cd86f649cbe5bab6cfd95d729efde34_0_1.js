function buildContent() {
    Help.hide()

    // add overlay
    var overlay = $('<div/>', {
      id: 'vromeHelpOverlay'
    })
    $(document.body).append(overlay)

    // table all commands
    var table = HelpUtils.buildCommandsHTML()

    // add help box
    var helpBox = $('<div/>', {
      id: 'vromeHelpBox'
    })
    helpBox.append(table)
    $(document.body).append(helpBox)

    // resize overlay based on helpbox
    var height = helpBox.height();
    if($(document.body).height() > height)
      height = $(document.body).height()

    overlay.css({
      height: height,
      width: '100%'
    })
  }