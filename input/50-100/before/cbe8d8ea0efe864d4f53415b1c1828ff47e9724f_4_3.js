function(item) {
                        try {
                            new RegExp(item.service);
                        } catch (e) {
                            valid = false;
                            return cb(e);
                        }

                        try {
                            new RegExp(item.method);
                        } catch (e) {
                            valid = false;
                            return cb(e);
                        }
                    }