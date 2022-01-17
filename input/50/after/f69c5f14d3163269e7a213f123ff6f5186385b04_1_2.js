function(model, attr){
                assert.same(this.model, model);
                assert.equals(['age', 'name'], attr);
                done();
            }