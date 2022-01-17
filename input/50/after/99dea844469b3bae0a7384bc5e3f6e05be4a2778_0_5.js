function(obj, next){
  if(obj.password && obj.password.length > 0){
    obj.hash = hash.create(obj.password)
  }
  next(obj)
}