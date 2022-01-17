function(model, error){
            assert.equals(['postalCode must be 2 characters'], error);
            done();
        }