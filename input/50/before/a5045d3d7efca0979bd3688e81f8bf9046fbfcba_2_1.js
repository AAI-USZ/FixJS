function (er, done) {
        if (!done) done = req.query.done
        if (!done) return res.template('logged-out.ejs')
        res.redirect(done)
      }