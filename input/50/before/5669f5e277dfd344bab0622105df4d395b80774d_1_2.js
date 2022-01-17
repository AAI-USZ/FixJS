function(){
  queue.onAny(function(err, data, next){
    console.log(data);
    next();
  });
}