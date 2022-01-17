function(req,res) {
    renderCachableView(req, res, 'index.ejs', {title: 'A Better Way to Sign In', fullpage: true});
  }