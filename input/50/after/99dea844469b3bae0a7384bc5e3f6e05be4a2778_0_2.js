function(obj, next){
  delete obj.id
  delete obj.uuid
  delete obj.created_at
  delete obj.updated_at
  delete obj.hash
  next(obj)
}