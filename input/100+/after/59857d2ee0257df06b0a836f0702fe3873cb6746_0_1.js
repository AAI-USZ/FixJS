function() {
                        var instance = $(this).data(pluginName);

                        if (instance) {
                            instance.reload(options);
                        } else {
                            new Plugin(this, options);
                        }
                    }