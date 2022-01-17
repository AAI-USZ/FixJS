function domTemplate (name, callback) {
        return _.extTemplateLoader(name, function (template) {
            function templateFunc(context) {
                var html = template.call(this, context);
                var $dom = $(html);
                return $dom;
            }
            return callback(templateFunc);
        });
    }