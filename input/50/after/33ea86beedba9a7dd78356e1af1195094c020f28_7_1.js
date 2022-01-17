function(model, error){
            assert.equals(['Age must be greater than or equal to 1'], error);
            done();
        }