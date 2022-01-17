function(model, error){
            assert.equals(['age must be greater than or equal to 1'], error);
            done();
        }