function extTemplate (name, callback) {
        var useExtensions;
        function wrapTemplate(template) {
            var templateFunc = function(context) {
                var templateThis = this;
                context = context || {};
                context._done = [];
                _.each(useExtensions, function(ext) {
                    context = ext.call(templateThis, context);
                });
                var result = template.call(templateThis, context);
                _.each(context._done, function(callback) {
                    callback(result);
                });
                return result;
            }

            callback(templateFunc);
        }

        if (name.slice(-5) == '.html') {
            useExtensions = enabledExtensions.dom;
            return domTemplate(name, wrapTemplate);
        } else {
            useExtensions = enabledExtensions.plain;
            return _.extTemplateLoader(name, wrapTemplate);
        }
    }