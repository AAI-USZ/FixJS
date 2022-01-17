function(num){
  return Memo.find().sort('created_at', -1).limit(num);
}