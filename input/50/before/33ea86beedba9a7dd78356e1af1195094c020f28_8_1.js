function(model, error){
            assert.equals(['name must be at least 2 characters'], error);
            done();
        }