function(){
    it('should 400 on primitives', function(done){
      var app = connect();
      app.use(connect.json());

      app.use(function(req, res){
        res.end(JSON.stringify(req.body));
      });

      app.request()
      .post('/')
      .set('Content-Type', 'application/json')
      .write('true')
      .expect(400, done);
    })
  }