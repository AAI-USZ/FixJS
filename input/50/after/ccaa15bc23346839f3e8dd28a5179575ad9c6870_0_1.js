function(num){
  return this.find().sort('created_at', -1).limit(num);
}