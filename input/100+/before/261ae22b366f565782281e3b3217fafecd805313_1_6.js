function buildContent() {

    var table = HelpUtils.buildCommandsHTML()

    var div = $('<div/>', {
      id: 'vrome_help_box',
      'class': 'hidden'
    })
    div.append(table)
    $(document.body).append(div)




    var height = screen.height * 2;
    var width = screen.width - 100;
    var a = $('<a/>', {
      href: '#TB_inline?height=' + height + '&width=' + width + '&inlineId=vrome_help_box&modal=true',
      'class': 'thickbox hidden'
    })
    $(document.body).append(a)

    tb_init_dom()

    setTimeout(function() {
      div.appendTo($('#fucker'))
      div.css({
        'position': 'absolute',
        'z-index': 2147483647,
        'background-color': 'black',
        'color': 'white'
      })
      div.show()
      //      Zoom.reset()
      //      clickElement(a[0])
    }, 100);
  }