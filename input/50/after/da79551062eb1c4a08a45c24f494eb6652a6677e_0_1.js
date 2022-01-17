function(next){
  request.post('/todo/item')
  .type('application/octet-stream')
  .send('tobi')
  .end(function(res){
    assert('added "tobi"' == res.text, 'response text');
    next();
  });
}