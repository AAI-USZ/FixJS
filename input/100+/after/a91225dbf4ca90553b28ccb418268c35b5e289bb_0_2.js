function myprofile (req, required, cb) {
  if (typeof required === 'function') cb = required, required = false
  req.session.get('profile', function (er, data) {
    if (!required && er) er = null
    if (data && data.email) {
      data.gravatar = gravatar(data.email, {s:50, d:'retro'}, true)
    }
    if (er || data) return cb(er, data)

    // if we're logged in, try to see if we can get it
    var name = req.cookies.get('name')
    if (!name) return cb()

    var pu = '/_users/org.couchdb.user:' + name
    req.couch.get(pu, function (er, cr, data) {
      if (!required) er = null
      if (er || cr && cr.statusCode !== 200 || !data) {
        // Oh well.  Probably the login expired.
        return cb(er)
      }
      if (data.email) {
        data.gravatar = gravatar(data.email, {s:50, d:'retro'}, true)
      }
      req.session.set('profile', data)
      return cb(null, data)
    })
  })
}