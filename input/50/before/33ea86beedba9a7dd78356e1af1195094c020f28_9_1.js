function(model, error){
            assert.equals(['country must be one of: Norway, Sweeden'], error);
            done();
        }