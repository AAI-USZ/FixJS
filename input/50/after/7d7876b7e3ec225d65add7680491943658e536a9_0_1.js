function (model, resp) {
                            if (success) {
                                success(model, resp);
                            }
                            if (model.__fetchSuccessCallback) {
                                var tmp = model.__fetchSuccessCallback;
                                model.__fetchSuccessCallback = null; //remove the temporary method after use
                                tmp.apply(model);
                            }
                        }