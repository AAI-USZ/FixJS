function(done){
      app.request()
      .get('/')
      .set('Cookie', 'foo=s:' + val)
      .expect('{}', done);
    }