function (er, cr, data) {
      if (er || cr.statusCode !== 200) {
        // Oh well.  Probably the login expired.
        return cb(er)
      }
      if (data.email) {
        data.gravatar = gravatar(data.email, {s:50, d:'retro'}, true)
      }
      req.session.set('profile', data)
      return cb(null, data)
    }