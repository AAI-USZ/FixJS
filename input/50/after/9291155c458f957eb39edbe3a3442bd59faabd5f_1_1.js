function(json) {
                        self.nosAjaxError(json);
                        if ($.isFunction(old_error)) {
                            old_error.call(this, params);
                        }
                    }