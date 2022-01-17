function resize()
  {
    if (rcmail.env.task == 'mail' && (rcmail.env.action == 'show' || rcmail.env.action == 'preview')) {
      layout_messageview();
    }
    if (rcmail.env.task == 'mail' && rcmail.env.action == 'compose') {
      layout_composeview();
    }
  }