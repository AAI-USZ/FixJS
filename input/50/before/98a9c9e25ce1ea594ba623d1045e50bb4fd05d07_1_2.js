function(model, attr){
                assert.same(this.model, model);
                assert.equals(['age'], attr);
                done();
            }