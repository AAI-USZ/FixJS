function(done) {
            this.model.bind('validated:invalid', function(model, attr){
                assert.same(this.model, model);
                assert.equals(['age'], attr);
                done();
            }, this);

            this.model.set({age:0});
        }