function() {
                if (airy.options.is_airy_form($(this))) {
                    var form_url = airy.history.getState().hash;
                    if ($(this).attr('action').length > 0) {
                        form_url = $(this).attr('action');
                    }
                    if ($(this).attr('data-action')) {
                        form_url = $(this).attr('data-action');
                        $(this).attr('action', form_url);
                    }
                    if ($(this).attr('method').toLowerCase() == 'get') {
                        airy.request('get', form_url+'?'+$(this).serialize(), null, airy.options.no_state_change($(this)));
                        return false;
                    } else if ($(this).attr('method').toLowerCase() == 'post') {
                        return $(this).serializeForm(function(data, form) {
                            airy.request('post', form_url, data, airy.options.no_state_change(form));
                        }, $(this));
                    }
                }
            }