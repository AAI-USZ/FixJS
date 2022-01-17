function(model, error){
            assert.equals(['Postal code must be 2 characters'], error);
            done();
        }