function(done){
      app.request()
      .get('/does-not-exist')
      .expect(404, done);
    }