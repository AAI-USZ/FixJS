function () {
        var template;

        // Get the template from `this.options.template` or
        // `this.template`. The `options` takes precedence.
        if (this.options && this.options.template) {
            template = this.options.template;
        } else {
            template = this.template;
        }

        // check if it's a handlebars template
        if (_.isObject(template) && template.type === 'handlebars') {
            return template;
        }

        return _.bind(oldGetTemplateSelector, this)();
    }