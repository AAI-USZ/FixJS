function(obj, next){
  if(!obj.id){
    obj.login_count = 0
  }
  next()
}