function(url, callback){
            var el = $('#remote_form_dialog');
            $.ajax(url, {
                success: function(data){
                    // uuh, hacky. but works. :)
                    $('#remote_form_dialog h3').html($('h1', data));
                    $('#remote_form_dialog div.modal-body').html($('form', data));
                    var form = $('#remote_form_dialog form');
                    form.removeClass('span5 span6 span7 span8 span9 span10 span11');
                    $('button', form).hide();
                    $('a.btn', form).hide();
                    var submit = $('#remote_form_dialog .btn-confirm');
                    submit.on('click', function(event){
                        form.ajaxSubmit({
                            success: function(data){
                                el.modal('hide');
                                dialogs.notification('New password saved');
                            },
                            error: function(data){
                                // TODO: error handling
                            }
                        });
                    });
                }
            });
            el.modal();
        }