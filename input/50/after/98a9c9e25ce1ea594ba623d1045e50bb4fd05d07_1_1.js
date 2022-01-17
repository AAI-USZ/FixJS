function(valid, model, attr){
                refute(valid);
                assert.same(this.model, model);
                assert.equals(['age', 'name'], attr);
                done();
            }