function(options) {
                var args = arraySlice.call(arguments, 1),
                    returnValue = this;

                if (typeof options === 'string') {
                    this.each(function() {
                        var instance = $(this).data(pluginName);

                        if (!instance) {
                            return $.error(
                                'Cannot call methods on ' + pluginName + ' prior to initialization; ' +
                                'attempted to call method "' + options + '"'
                            );
                        }

                        if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                            return $.error(
                                'No such method "' + options + '" for ' + pluginName + ' instance'
                            );
                        }

                        var methodValue = instance[options].apply(instance, args);

                        if (methodValue !== instance && typeof methodValue !== 'undefined') {
                            returnValue = methodValue;
                            return false;
                        }
                    });
                } else {
                    var instance;
                    this.each(function() {
                        (instance = $(this).data(pluginName)) ? instance.reload(options) : new Plugin(this, options);
                    });
                }

                return returnValue;
            }