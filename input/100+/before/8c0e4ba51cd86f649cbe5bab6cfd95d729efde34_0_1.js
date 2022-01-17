function buildContent() {
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
    overlay.css({
      height: helpBox.height() + 50,
      width: '100%'
    })
  }