function(model, error){
            assert.equals(['passwordRepeat must be the same as password'], error);
            done();
        }