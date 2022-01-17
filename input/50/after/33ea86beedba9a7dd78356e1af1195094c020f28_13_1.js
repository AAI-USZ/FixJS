function(model, error){
            assert.equals(['Name is required'], error);
            done();
        }