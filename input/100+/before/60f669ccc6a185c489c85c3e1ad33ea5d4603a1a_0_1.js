function(event){
            event.preventDefault();
            var el = $('#remote_form_dialog');
            form.ajaxSubmit({
                success: function(data){
                    if($('.control-group.error', data).length){
                        var form = dialogs.patch_form(data);
                        $('#remote_form_dialog div.modal-body').html(form);
                    } else {
                        el.modal('hide');
                        if(callback){
                            callback();
                        }
                        dialogs.notification('Saved');
                    }
                }
            });
        }