function(model, attrs){
                assert.same(this.model, model);
                assert.equals(['age', 'name'], attrs);
                done();
            }