function(req, res){
  var app_root = (req.connection.encrypted ? 'https' : 'http') + '://' + req.headers['host'];
  res.render('index', { title: 'Image Search', source: 'bing.net', app_root: app_root });
}