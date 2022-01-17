function(success, action, model, values, controller, dbcfg) {
                                if (action.type == 'read'){
                                    if (success)
                                    controller.application.fireEvent('loginok', dbcfg.host, values);
                                    else
                                    controller.application.fireEvent('loginfail', dbcfg.host, values);
                                }

                            }