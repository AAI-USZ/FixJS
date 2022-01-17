function(req, res) {
  if (req.user.isAuthenticated) return res.redirect('/profile')
  var form = new forms.LoginForm({initial: req.query})
  res.render('login', {form: form})
}