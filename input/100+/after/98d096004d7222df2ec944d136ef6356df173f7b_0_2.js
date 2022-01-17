function resize()
  {
    if (rcmail.env.task == 'mail' && (rcmail.env.action == 'show' || rcmail.env.action == 'preview')) {
      layout_messageview();
    }
    if (rcmail.env.task == 'mail' && rcmail.env.action == 'compose') {
      layout_composeview();
    }

    // make iframe footer buttons float if scrolling is active
    $('body.iframe .footerleft').each(function(){
      var footer = $(this),
        body = $(document.body),
        floating = footer.hasClass('floating'),
        overflow = body.outerHeight(true) > $(window).height();
      if (overflow != floating) {
        var action = overflow ? 'addClass' : 'removeClass';
        footer[action]('floating');
        body[action]('floatingbuttons');
      }
    })

  }