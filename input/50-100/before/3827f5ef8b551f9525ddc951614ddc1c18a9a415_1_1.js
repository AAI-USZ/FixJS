function(done){
      var app = express();

      app.get('/file/*', function(req, res){
        res.end(req.params[0]);
      });

      request(app)
      .get('/file/javascripts/jquery.js')
      .expect('javascripts/jquery.js', done);
    }