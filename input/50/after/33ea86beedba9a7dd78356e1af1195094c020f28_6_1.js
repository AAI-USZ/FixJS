function(model, error){
            assert.equals(['Name must be at most 2 characters'], error);
            done();
        }