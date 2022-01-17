function createContext (jsContext, data) {
        var context = data || {};
        var placeholderId = 1;
        context._this = jsContext;
        context._done = [];
        context._wrap = function (name, originalFunc) {
            function wrapper () {
                var args = Array.prototype.slice.call(arguments);
                var id = placeholderId++;
                var placeholder = '-+!__TI_PLACEHOLDER_'+id+'__!+-';

                context._done.push(function (text, callback) {
                    var replaceCallback = function (replacement) {
                        callback(text.replace(placeholder, replacement));
                    };

                    args.unshift(replaceCallback);
                    originalFunc.apply(context._this, args);
                });
                return placeholder;
            }
            context[name] = wrapper;
        };
        _.each(contextExtensions, function (ext) {
            ext.call(context._this, context);
        });
        return context;
    }