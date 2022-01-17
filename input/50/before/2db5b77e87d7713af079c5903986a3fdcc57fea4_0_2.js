function(err, users) {
    res.render('index', {
      title: "TAU HERPDERP",
      users: users
    })
  }