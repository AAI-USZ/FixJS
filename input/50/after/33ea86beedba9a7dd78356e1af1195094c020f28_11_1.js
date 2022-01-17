function(model, error){
            assert.equals(['Age must be between 1 and 10'], error);
            done();
        }