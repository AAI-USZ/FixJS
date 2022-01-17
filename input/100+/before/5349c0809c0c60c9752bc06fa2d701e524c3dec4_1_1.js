function(){
    var ensureHttps = middlewares.ensureHttps();

    setup(function(){
      delete req.headers['x-forwarded-proto'];
      req.protocol = 'http';
      req.connection.encrypted = false;

      res.redirect = function(url){
        throw Error('Redirection to '+url);
      };
    });

    test('middleware available', function(){
      expect(middlewares.ensureHttps).to.be.a('function');
      expect(middlewares.ensureHttps.replaceProtocol).to.be.a('function');
      expect(ensureHttps).to.be.a('function');
    });

    test('already in https', function(done){
      req.connection.encrypted = true;

      expect(function(){
        ensureHttps(req, res, function next(){
          done();
        });
      }).not.to.throwException();
    });

    test('already in https with a proxy', function(done){
      req.protocol = 'https';

      expect(function(){
        ensureHttps(req, res, function next(){
          done();
        });
      }).not.to.throwException();
    });

    test('in http, switching to https', function(done){
      res.redirect = function(url){
        expect(url).to.be('https://www.example.com/faq.html');

        done();
      };

      ensureHttps(req, res, function next(){ });
    });
  }