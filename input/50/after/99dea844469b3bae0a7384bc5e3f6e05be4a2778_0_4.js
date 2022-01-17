function(obj, next){
  if(!obj.uuid){
    obj.uuid = uuid.v4()
  }
  next(obj)
}