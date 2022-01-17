function(done) {
            this.model.bind('validated', function(valid, model, attrs){
                refute(valid);
                assert.same(this.model, model);
                assert.equals(['age', 'name'], attrs);
                done();
            }, this);

            this.model.set({
                age: 0,
                name: ''
            });
        }