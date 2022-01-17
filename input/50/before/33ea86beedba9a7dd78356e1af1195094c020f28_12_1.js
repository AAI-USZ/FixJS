function(model, error){
            assert.equals(['name must be between 2 and 4 characters'], error);
            done();
        }