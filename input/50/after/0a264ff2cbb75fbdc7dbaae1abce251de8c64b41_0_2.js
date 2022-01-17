function(err, users) {
    console.log(users);
    res.render('index', {
      title: "TAU HERPDERP",
      users: users
    })
  }