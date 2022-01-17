function (req, res, next) {
      if (req.article.user.id != req.session.auth.userId) {
        req.flash('notice', 'You are not authorized');
        res.redirect('/article/'+req.article.id);
      }
      next()
    }