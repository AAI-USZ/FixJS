function(data){
                    // uuh, hacky. but works. :)
                    $('#remote_form_dialog h3').html($('h1', data));
                    var form = dialogs.patch_form(data);
                    $('#remote_form_dialog div.modal-body').html(form);
                    var submit = $('#remote_form_dialog .btn-confirm');
                    submit.bind('click', {callback: callback}, dialogs.async_form_submit);
                    form.bind('submit', {callback: callback}, dialogs.async_form_submit);
                }