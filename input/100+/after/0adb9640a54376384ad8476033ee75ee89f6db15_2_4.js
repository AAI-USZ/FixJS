function() {
    _.mixin({
        extTemplate: extTemplate,
        extTemplateLoader: null
    });

    var contextExtensions = {};
    var enabledExtensions = [];

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
    };

    function extTemplate (name, callback) {
        function templateLoaded (templateFuncSync) {
            var templateFuncAsync = function (data, callback) {
                var context = createContext(this, data);
                var text = templateFuncSync.call(context._this, context);
                context._done = _.map(context._done, function (done) {
                    return function (text, callback) {
                        done(text, function (text) {
                            callback(null, text);
                        });
                    }
                });
                context._done.unshift(function (callback) {
                    callback(null, text);
                });
                async.waterfall(context._done, function (err, text) {
                    callback(text);
                });
            };

            callback(templateFuncAsync);
        }

        return _.extTemplateLoader(name, templateLoaded);
    };

    extTemplate.contextExtensions = function (what) {
        if (what === undefined) {
            return enabledExtensions;
        } else {
            enabledExtensions = _.map(what, function (extName) {
                return contextExtensions[extName];
            });
        }
    };

    contextExtensions.include = function (context) {
        context._wrap('include', function (callback, name, includeContext) {
            extTemplate(name, function (template) {
                template(_.extend({}, context, includeContext), callback);
            });
        });
    };

    enabledExtensions = [contextExtensions.include];
}