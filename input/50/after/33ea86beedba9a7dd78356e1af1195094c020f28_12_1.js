function(model, error){
            assert.equals(['Name must be between 2 and 4 characters'], error);
            done();
        }