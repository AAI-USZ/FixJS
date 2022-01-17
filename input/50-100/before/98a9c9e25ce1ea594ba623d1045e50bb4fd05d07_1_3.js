function(done) {
            this.model.bind('error', function(model, error) {
                assert.same(this.model, model);
                assert.equals(['age'], error);
                done();
            }, this);

            this.model.set({age:0});
        }