function (e, token) {
      req.cookies._tid = token
      res.cookie('_tid', req.cookies._tid, { 
        expires: new Date(Date.now() + 315569259747), 
        httpOnly: true 
      })
      console.log('info: pixel')
      res.end(pixel, 'binary')
    }