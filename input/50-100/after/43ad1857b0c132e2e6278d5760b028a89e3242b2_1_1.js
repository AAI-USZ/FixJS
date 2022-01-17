function(done){
        var app = express();
        
        app.set('jsonp callback name', 'clb');
        app.use(function(req, res){
          res.json({ count: 1 });
        });

        request(app)
        .get('/?clb=something')
        .end(function(err, res){
          res.headers.should.have.property('content-type', 'text/javascript; charset=utf-8');
          res.text.should.equal('something({"count":1});');
          done();
        })
      }