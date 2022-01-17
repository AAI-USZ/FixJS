function(done){
        var app = express();

        app.use(function(req, res){
          res.json({ count: 1 });
        });

        request(app)
        .get('/?callback=callbacks[123]')
        .end(function(err, res){
          res.headers.should.have.property('content-type', 'text/javascript; charset=utf-8');
          res.text.should.equal('callbacks[123]({"count":1});');
          done();
        })
      }