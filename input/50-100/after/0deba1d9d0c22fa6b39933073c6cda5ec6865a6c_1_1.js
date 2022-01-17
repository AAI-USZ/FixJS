function(response) {
                        if (!$.isEmptyObject(response.files)) {
                            for (name in response.files) {
                                appendFiles(name, response.files[name]);
                            }
                        } else {
                            callback(obj, data);
                        }
                    }