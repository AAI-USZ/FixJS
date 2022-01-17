function(data){
                    // uuh, hacky. but works. :)
                    $('#remote_form_dialog h3').html($('h1', data));
                    var form = patch_form(data);
                    $('#remote_form_dialog div.modal-body').html(form);
                    var submit = $('#remote_form_dialog .btn-confirm');
                    submit.on('click', function(event){
                        form.ajaxSubmit({
                            success: function(data){
                                if($('.control-group.error', data).length){
                                    var form = patch_form(data);
                                    $('#remote_form_dialog div.modal-body').html(form);
                                } else {
                                    el.modal('hide');
                                    dialogs.notification('Saved');
                                }
                            }
                        });
                    });
                }