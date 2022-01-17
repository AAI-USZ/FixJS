function(res){
    assert(res.header['content-type'] == 'application/x-www-form-urlencoded');
    assert(res.text == 'user[name]=tj&user[email]=tj@vision-media.ca')
    next();
  }