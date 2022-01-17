function(obj, next){
  if(obj.id){
    obj.updated_at = (new Date()).toJSON()
  }else{
    obj.updated_at = null
  }
  next()
}