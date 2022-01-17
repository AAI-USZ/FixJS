function(req,res) {
    renderCachableView(req, res, 'confirm.ejs', {title: 'Confirm Email'});
  }