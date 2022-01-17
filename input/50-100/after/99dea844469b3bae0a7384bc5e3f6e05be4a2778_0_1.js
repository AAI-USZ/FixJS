function(obj, next){
  delete obj.password
  delete obj.password_confirmation
  next(obj)
}