function(req, res) {
  req.nav.steps = [
    { url: '/docs', title: 'Documents' },
    { url: '/docs/' + req.params.library, title: req.metadata.title },
    { active: true, title: 'Settings' }
  ];

  res.render('admin', {
    nav: req.nav,
    metadata: req.metadata,
  })
}