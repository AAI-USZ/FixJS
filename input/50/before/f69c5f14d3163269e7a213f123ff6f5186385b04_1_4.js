function(valid, model, attrs){
                refute(valid);
                assert.same(this.model, model);
                assert.equals(['age', 'name'], attrs);
                done();
            }