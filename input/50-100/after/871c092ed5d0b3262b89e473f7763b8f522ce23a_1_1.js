function(done){
      var app = express();

      app.get('/user/:user*', function(req, res){
        res.end(req.params.user);
      });

      request(app)
      .get('/user/122')
      .expect('122', done);
    }