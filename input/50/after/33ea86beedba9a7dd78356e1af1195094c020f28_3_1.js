function(model, error){
            assert.equals(['Password repeat must be the same as Password'], error);
            done();
        }