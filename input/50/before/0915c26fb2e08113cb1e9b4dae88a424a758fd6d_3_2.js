function(done){
      app.request()
      .get('/')
      .set('Cookie', 'foo=' + val)
      .expect('{}', done);
    }