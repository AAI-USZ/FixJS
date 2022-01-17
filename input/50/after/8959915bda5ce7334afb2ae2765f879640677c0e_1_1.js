function(req, res) {
  if (req.user.isAuthenticated) return res.redirect('/profile')
  var form = new forms.RegisterForm()
  res.render('register', {form: form})
}