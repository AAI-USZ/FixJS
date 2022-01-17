function(model, error){
            assert.equals(['email must be a valid email'], error);
            done();
        }