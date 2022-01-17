function(res) {
      session.avatar = res.headers.location;
      session.name = screenName;
      self.redirect('/battle');
    }