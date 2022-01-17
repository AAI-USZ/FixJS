function(model, attrs){
                assert.same(this.model, model);
                assert.equals(['name'], attrs);
                done();
            }