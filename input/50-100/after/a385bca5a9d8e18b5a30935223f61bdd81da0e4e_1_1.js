function(err, docs) {
    res.render('index', {title: 'langy.io', user: docs, req: req});
  }