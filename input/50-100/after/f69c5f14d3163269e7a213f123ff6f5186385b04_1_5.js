function(done) {
            this.model.bind('validated:invalid', function(model, attrs){
                assert.same(this.model, model);
                assert.equals(['name'], attrs);
                done();
            }, this);

            this.model.set({
                age: 1
            }, this);
        }