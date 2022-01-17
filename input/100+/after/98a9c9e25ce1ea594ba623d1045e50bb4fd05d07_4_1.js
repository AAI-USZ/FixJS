function() {
        var that = this;
        var Model = Backbone.Model.extend({
            validation: {
                name: {
                    required: true
                },
                agree: {
                    required: true
                },
                dependsOnName: {
                    required: function() {
                        return this.get('name') === 'name';
                    }
                }
            }
        });

        this.model = new Model({
            name: 'name',
            agree: true,
            dependsOnName: 'depends'
        });
        this.view = new Backbone.View({
            model: this.model
        });

        Backbone.Validation.bind(this.view, {
            valid: this.spy(),
            invalid: this.spy()
        });
    }