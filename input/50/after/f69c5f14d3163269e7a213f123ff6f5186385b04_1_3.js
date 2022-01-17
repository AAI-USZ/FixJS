function(model, error) {
                assert.same(this.model, model);
                assert.equals(['age', 'name'], error);
                done();
            }