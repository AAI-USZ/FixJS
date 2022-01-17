function(req, res, next) {
  if (req.user.isAuthenticated) return res.redirect('/profile')
  var form = forms.LoginForm({data: req.body})
    , redisplay = function() { res.render('login', {form: form}) }
  if (!form.isValid()) return redisplay()
  var data = form.cleanedData
  validateCredentials(data.username, data.password, function(err, user) {
    if (!user) {
      form.addFormError('Username/password did not match.')
      return redisplay()
    }
    // Authorised
    req.session.userId = user.id
    if (data.next) {
      return res.redirect(data.next)
    }
    res.redirect('/profile')
  })
}