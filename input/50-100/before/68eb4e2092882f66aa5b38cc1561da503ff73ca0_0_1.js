function findById(id, fn) {
  var index = id - 1;
  if(tempUser[index])
  {
    fn(null, tempUser[index]);
  }
  else
  {
    fn(new Error('User ' + id + ' does not exist'));
  }
}