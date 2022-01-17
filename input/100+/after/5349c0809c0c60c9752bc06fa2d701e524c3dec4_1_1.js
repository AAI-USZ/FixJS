function(){
    var ensureHttps = middlewares.ensureHttps();

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
      req.secure = true;

      expect(function(){
        ensureHttps(req, res, function next(){
          done();
        });
      }).not.to.throwException();
    });

    test('in http, switching to https', function(done){
      res.redirect = function(url){
        expect(url).to.be('https://127.0.0.1:80/faq.html');

        done();
      };

      ensureHttps(req, res, function next(){ });
    });

    test('in http, not switching because of environment', function(done){
      ensureHttps = middlewares.ensureHttps({
        envs: ['production']
      });

      expect(function(){
        ensureHttps(req, res, function next(){
          done();
        });
      }).not.to.throwException();
    });

    test('in http, switching because of environment', function(done){
      ensureHttps = middlewares.ensureHttps({
        envs: ['testing']
      });

      res.redirect = function(uri){
        done();
      };

      expect(function(){
        ensureHttps(req, res, function next(){
          throw Error('Should not call next element in stack.');
        });
      }).not.to.throwException();
    });
  }