function(done){
      req.protocol = 'https';

      expect(function(){
        ensureHttps(req, res, function next(){
          done();
        });
      }).not.to.throwException();
    }