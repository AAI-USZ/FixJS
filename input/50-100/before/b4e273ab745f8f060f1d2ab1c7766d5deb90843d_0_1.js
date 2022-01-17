function (e, token) {
      req.cookies._tracker = token
      res.cookie('_tracker', req.cookies._tracker, { 
        expires: new Date(Date.now() + 900000), 
        httpOnly: true 
      })
      res.end(pixel, 'binary')
    }