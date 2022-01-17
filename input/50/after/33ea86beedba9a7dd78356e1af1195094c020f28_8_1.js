function(model, error){
            assert.equals(['Name must be at least 2 characters'], error);
            done();
        }