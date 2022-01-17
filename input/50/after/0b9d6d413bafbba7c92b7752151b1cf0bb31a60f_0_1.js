function(req,res) {
    renderCachableView(req, res, 'unsupported_dialog.ejs', {
      title: _('Unsupported Browser'),
      layout: 'dialog_layout.ejs',
      useJavascript: false
    });
  }