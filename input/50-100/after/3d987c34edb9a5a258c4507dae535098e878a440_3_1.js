function (template, data) {
        if (_.isObject(template) && template.type === 'handlebars') {
            return template.template(data, template.options);
        }

        return oldRender(template, data);
    }