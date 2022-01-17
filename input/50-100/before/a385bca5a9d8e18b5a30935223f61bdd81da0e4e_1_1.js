function(req, res) {
  if(req.loggedIn) {
    users.find({userid: req.session.auth.twitter.user.id_str}, function(err, docs) {
      console.log(docs);
      res.render('index', {title: 'langy.io', user: docs, req: req});
    });
  } else {
    res.render('error', {title: 'error', user: nobody, req: req});
  }

}