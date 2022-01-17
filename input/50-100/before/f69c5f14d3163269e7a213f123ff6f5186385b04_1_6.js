function(done) {
            this.model.bind('error', function(model, error) {
                assert.equals(['age', 'name'], error);
                done();
            }, this);

            this.model.set({
                age: 0,
                name: ''
            });
        }