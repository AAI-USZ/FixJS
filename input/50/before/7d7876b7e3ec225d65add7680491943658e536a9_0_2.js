function (model, resp) {
                            if (error) error(model, resp);
                            if (model.__fetchErrorCallback) {
                                var tmp = model.__fetchErrorCallback;
                                model.__fetchErrorCallback = null; //remove the temporary method after use
                                tmp.apply(model);
                            }
                        }