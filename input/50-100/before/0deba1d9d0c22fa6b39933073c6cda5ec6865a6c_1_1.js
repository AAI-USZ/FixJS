function(response) {
                        if (response.files) {
                            for (name in response.files) {
                                appendFiles(name, response.files[name]);
                            }
                        }
                    }