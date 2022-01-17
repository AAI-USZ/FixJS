function(data){
                    // uuh, hacky. but works. :)
                    $('#remote_form_dialog h3').html($('h1', data));
                    var form = dialogs.patch_form(data);
                    $('#remote_form_dialog div.modal-body').html(form);
                    var submit = $('#remote_form_dialog .btn-confirm');
                    submit.on('click', dialogs.async_form_submit);
                    form.on('submit', dialogs.async_form_submit);
                }