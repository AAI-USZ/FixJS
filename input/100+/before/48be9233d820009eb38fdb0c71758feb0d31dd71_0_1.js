function(){
  describe('.download(path)', function(){
    it('should transfer as an attachment', function(done){
      var app = express();

      app.use(function(req, res){
        res.download('test/fixtures/user.html');
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.header('Content-Type', 'text/html; charset=UTF-8');
        res.should.have.header('Content-Disposition', 'attachment; filename="user.html"');
        res.text.should.equal('<p>{{user.name}}</p>');
        done();
      });
    })
  })

  describe('.download(path, filename)', function(){
    it('should provide an alternate filename', function(done){
      var app = express();

      app.use(function(req, res){
        res.download('test/fixtures/user.html', 'document');
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.header('Content-Type', 'text/html; charset=UTF-8');
        res.should.have.header('Content-Disposition', 'attachment; filename="document"');
        done();
      });
    })
  })

  describe('.download(path, fn)', function(){
    it('should invoke the callback', function(done){
      var app = express()
        , calls = 0;

      app.use(function(req, res){
        res.download('test/fixtures/user.html', done);
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.header('Content-Type', 'text/html; charset=UTF-8');
        res.should.have.header('Content-Disposition', 'attachment; filename="user.html"');
      });
    })
  })

  describe('.download(path, filename, fn)', function(){
    it('should invoke the callback', function(done){
      var app = express()
        , calls = 0;

      app.use(function(req, res){
        res.download('test/fixtures/user.html', 'document', done);
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.header('Content-Type', 'text/html; charset=UTF-8');
        res.should.have.header('Content-Disposition', 'attachment; filename="document"');
      });
    })
  })
}