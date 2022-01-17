function(req,res) {
    renderCachableView(req, res, 'confirm.ejs', {title: 'Verify Email Address', fullpage: false});
  }