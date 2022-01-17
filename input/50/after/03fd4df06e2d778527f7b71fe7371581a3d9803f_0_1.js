function (XMLHttpRequest) {
                            if ($(options.content_type).val()) {
                                options.loader.show();
                            } else {
                                return false;
                            }
                        }