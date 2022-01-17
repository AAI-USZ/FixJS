function() {
//        var bindings = {count: {selector: '[name=count]', converter: namespace.app.intConverter}};
//        var dateBindings = {startDate: {selector: '[name=startDate]', converter: namespace.app.dateConverter}};

        var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');
        bindings['count'].converter = namespace.app.intConverter;
        bindings['startDate'].converter = namespace.app.dateConverter;
        console.log("Binding:");
        console.log(bindings);
        this._modelBinder.bind(this.model, this.el, bindings);
    }