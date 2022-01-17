function($, $fn, name, callback) {
        var pluginName,
            pluginPrefix,
            pluginFn;

        if (name !== 'jcarousel') {
            pluginName   = 'jcarousel' + name.toLowerCase();
            pluginPrefix = 'jcarousel-' + name.toLowerCase();
            pluginFn     = 'jcarousel' +
                               name.charAt(0).toUpperCase() +
                               name.slice(1);
        } else {
            pluginName = pluginPrefix = pluginFn = name;
        }

        var plugin = function(element, options) {
            // allow instantiation without "new" keyword
            if (!this._init) {
                return new plugin(element, options);
            }

            this._element = $(element).data(pluginName, this);

            this.options = $.extend({},
                this.options,
                this._options(),
                options);

            this._create();
            this._init();
        };

        plugin.prototype = $.extend({}, jCarousel.Plugin, {
            pluginName:   pluginName,
            pluginPrefix: pluginPrefix,
            pluginFn:     pluginFn
        }, callback.call(jCarousel, $, $fn));

        $fn[pluginFn] = function(options) {
            var args        = Array.prototype.slice.call(arguments, 1),
                returnValue = this;

            if (typeof options === 'string') {
                this.each(function() {
                    var instance = $.data(this, pluginName);

                    if (!instance) {
                        return $.error(
                            'Cannot call methods on ' + pluginFn + ' prior to initialization; ' +
                            'attempted to call method "' + options + '"'
                        );
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                        return $.error(
                            'No such method "' + options + '" for ' + pluginFn + ' instance'
                        );
                    }

                    var methodValue = instance[options].apply(instance, args);

                    if (methodValue !== instance && typeof methodValue !== 'undefined') {
                        returnValue = methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $.data(this, pluginName);

                    if (instance) {
                        if (options) {
                            instance.option(options);
                        }
                    } else {
                        plugin(this, options);
                    }
                });
            }

            return returnValue;
        };
    }