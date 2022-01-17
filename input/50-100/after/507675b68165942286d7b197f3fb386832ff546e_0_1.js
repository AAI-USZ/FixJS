function(req, res) {
  req.nav.steps = [
    { url: '/lists', title: 'Lists' },
    { url: '/lists/' + req.params.list, title: req.metadata.title },
    { active: true, title: 'Settings'}
  ];
  
  res.render('admin', {
    nav: req.nav,
    metadata: req.metadata,
  })
}