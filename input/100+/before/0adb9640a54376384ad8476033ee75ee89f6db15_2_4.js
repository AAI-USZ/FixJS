function() {
    _.mixin({
        extTemplate: extTemplate,
        extTemplateLoader: null
    });

    var contextExtensions = {};
    var enabledExtensions = {};

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
    };

    function domTemplate (name, callback) {
        return _.extTemplateLoader(name, function (template) {
            function templateFunc(context) {
                var html = template.call(this, context);
                var $dom = $(html);
                return $dom;
            }
            return callback(templateFunc);
        });
    };

    extTemplate.setContextExtensions = function(which, what) {
        var extensions = enabledExtensions[which] = [];
        _.each(what, function (extName) {
            extensions.push(contextExtensions[extName]);
        });
    };

    contextExtensions.include = function (context) {
        context._includeId = 1;

        context.include = function(name, includeContext) {
            includeContext = includeContext || {};

            var includeId = context._includeId++;
            var spanId = 'ti_include_'+includeId;
            var span = '<span id="'+spanId+'"></span>';

            context._done.push(function($dom) {
                extTemplate(name, function (template) {
                    var html = template(_.extend({}, context, includeContext));
                    $dom.filter('#'+spanId).replaceWith(html);
                    $dom.find('#'+spanId).replaceWith(html);
                });
            });

            return span;
        };

        return context;
    };

    enabledExtensions.dom = [contextExtensions.include];
    enabledExtensions.plain = [];
}