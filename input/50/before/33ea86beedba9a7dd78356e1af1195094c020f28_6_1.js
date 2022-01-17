function(model, error){
            assert.equals(['name must be at most 2 characters'], error);
            done();
        }