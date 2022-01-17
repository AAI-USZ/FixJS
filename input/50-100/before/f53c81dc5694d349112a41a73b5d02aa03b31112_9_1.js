function() {
                    var instance = $.data(this, pluginName);

                    if (instance) {
                        if (options) {
                            instance.option(options);
                        }
                    } else {
                        plugin(this, options);
                    }
                }