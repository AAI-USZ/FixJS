function() {
        var that = this;
        var Model = Backbone.Model.extend({
            validation: {
                name: {
                    pattern: /^test/
                },
                email: {
                    pattern: 'email'
                }
            }
        });

        this.model = new Model({
            name: 'test',
            email: 'test@example.com'
        });
        this.view = new Backbone.View({
            model: this.model
        });

        Backbone.Validation.bind(this.view, {
            valid: this.spy(),
            invalid: this.spy()
        });
    }