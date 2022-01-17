function(obj, next){
  delete obj.hash

  if(obj.login_count)
    obj.login_count = parseInt(obj.login_count)

  if(obj.role)
    obj.role = parseInt(obj.role)

  next(obj)
}