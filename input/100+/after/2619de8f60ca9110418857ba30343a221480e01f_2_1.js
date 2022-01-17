function(){
    it('should not parse primitives', function(done){
      var app = connect();
      app.use(connect.json({ strict: true }));

      app.use(function(req, res){
        res.end(JSON.stringify(req.body));
      });

      app.request()
      .post('/')
      .set('Content-Type', 'application/json')
      .write('true')
      .end(function(res){
        res.should.have.status(400);
        res.body.should.include('invalid json');
        done();
      });
    })
  }