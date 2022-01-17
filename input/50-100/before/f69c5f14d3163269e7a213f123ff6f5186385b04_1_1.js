function(done) {
            this.model.bind('validated', function(valid, model, attr){
                refute(valid);
                assert.same(this.model, model);
                assert.equals(['age'], attr);
                done();
            }, this);

            this.model.set({age:0});
        }