function(obj, next){
  if(obj.role){
    var role = parseInt(obj.role)
    if(role < 0 || role > 5){
      obj.role = 5
    }
  }else{
    obj.role = 5 
  }
  next(obj)
}