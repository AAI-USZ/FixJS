function(done) {
            this.model.bind('validated:invalid', function(model, attrs){
                assert.same(this.model, model);
                assert.equals(['age', 'name'], attrs);
                done();
            }, this);

            this.model.set({
                age: 0,
                name: ''
            }, this);
        }