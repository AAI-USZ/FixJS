function(req, res, next) {
  if (req.user.isAuthenticated) return res.redirect('/profile')
  var form = forms.RegisterForm({data: req.body})
    , redisplay = function() { res.render('register', {form: form}) }
  if (!form.isValid()) return redisplay()
  var data = form.cleanedData
  getUserByUsername(data.username, function(err, user) {
    if (err) return next(err)
    if (user) {
      form.addError('username', 'This username is already taken.')
      return redisplay()
    }
    createUser(data.username, data.email, data.password, function(err, user) {
      if (err) return next(err)
      req.session.userId = user.id
      res.redirect('/profile')
    })
  })
}