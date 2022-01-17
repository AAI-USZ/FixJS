function(model, error){
            assert.equals(['Country must be one of: Norway, Sweeden'], error);
            done();
        }