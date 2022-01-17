function(model, error){
            assert.equals(['Email must be a valid email'], error);
            done();
        }