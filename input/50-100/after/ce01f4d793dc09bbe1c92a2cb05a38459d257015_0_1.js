function (req, res, next) {
      if (req.article.user._id.toString() != req.user._id.toString()) {
        req.flash('notice', 'You are not authorized');
        res.redirect('/article/'+req.article.id);
      }
      next()
    }