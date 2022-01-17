function(done){
      req.secure = true;

      expect(function(){
        ensureHttps(req, res, function next(){
          done();
        });
      }).not.to.throwException();
    }