function(res){
    assert('added "tobi"' == res.text, 'response text');
    next();
  }