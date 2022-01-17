function(err, types) {
    res.render('add', {title: 'Add a Project', user: user, req: req, types: types});
  }