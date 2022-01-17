function(res){
          assert.typeOf(res.body, 'Array');
          assert.equal(res.body.length, 3);
          done();
        }