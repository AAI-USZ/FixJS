function (context) {
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
    }