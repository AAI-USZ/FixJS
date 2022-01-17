function(model, error){
            assert.equals(['age must be between 1 and 10'], error);
            done();
        }