function(data){
                                if($('.control-group.error', data).length){
                                    var form = patch_form(data);
                                    $('#remote_form_dialog div.modal-body').html(form);
                                } else {
                                    el.modal('hide');
                                    dialogs.notification('Saved');
                                }
                            }