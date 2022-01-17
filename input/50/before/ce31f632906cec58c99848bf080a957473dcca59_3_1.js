function(req,res) {
    renderCachableView(req, res, 'unsupported_dialog.ejs', {layout: 'dialog_layout.ejs', useJavascript: false});
  }