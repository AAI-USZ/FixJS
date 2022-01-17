function(event){
                        form.ajaxSubmit({
                            success: function(data){
                                el.modal('hide');
                                dialogs.notification('New password saved');
                            },
                            error: function(data){
                                // TODO: error handling
                            }
                        });
                    }