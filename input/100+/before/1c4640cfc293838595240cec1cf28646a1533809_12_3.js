function(done) {    
      
      var req = calipsoHelper.requests.adminUser,
          res = calipsoHelper.response,
          response = 0,
          responseContent = '',
          routeFn = calipso.routingFn();

      req.url = '/secured';
      res.outputStack = [];

      // Over ride the res.end and increment our counter
      res.send = function(content) {
        responseContent = content;
        response++; 
      }

      routeFn(req, res, function(err) { 
        response.should.equal(1);
        res.outputStack.should.eql(['module_first','module_a','module_last']);
        responseContent.should.include('world');
        done();
      })

    }