function(model, error) {
                assert.same(this.model, model);
                assert.equals(['age'], error);
                done();
            }