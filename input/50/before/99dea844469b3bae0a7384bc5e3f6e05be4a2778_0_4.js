function(obj, next){
  if(!obj.id){
    obj.created_at = (new Date()).toJSON()
  }
  next()
}