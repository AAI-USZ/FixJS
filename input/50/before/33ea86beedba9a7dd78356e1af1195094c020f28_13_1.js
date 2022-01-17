function(model, error){
            assert.equals(['name is required'], error);
            done();
        }