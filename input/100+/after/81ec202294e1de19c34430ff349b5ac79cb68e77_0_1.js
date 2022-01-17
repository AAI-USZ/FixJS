function() {
            // restore form after error message
            if (btn.hasClass('restore')) {
                btn.removeClass('restore');
                
                // enable form  
                frm.find(':input').removeAttr('disabled');
                frm.find(':input').val('');
                frm.validate().resetForm();
                        
                result.hide(); 
                frm.show();
                $(this).html(orig_btn_label)
            // submit button normally
            } else {
                var kvs = {}
                if (frm.validate().form()) {
                    frm.find(":input").each(function() {
                        if ($(this).attr('type') == 'password') {
                            kvs[$(this).attr('id')] = MD5($(this).val());
                        } else {
                            kvs[$(this).attr('id')] = $(this).val();
                        }
                    });
                    
                    // Disable form
                    frm.find(':input').attr('disabled', '');
                    
                    // Disable button
                    btn.attr('disabled', '');
                    btn.html('Sending...');
                    
                    $.ajax({
                        type: 'GET',
                        url: '/' + action,
                        data: kvs,
                    }).done(function(data, code, jqxhr) {
                        var data = $.parseJSON(data);
                        var code = data['code'];
                        var message = data['message'];
                        
                        if (code == 200) { // success
                            // if we were trying to signin reload with new session on success
                            if (action == 'email-signin') {
                                location.reload();
                            } else {
                                // hide form & show result
                                result.html('Success!');
                                frm.hide();
                                result.show();
                                
                                btn.hide();
                            }
                        } else {
                            // should never happen (HTTP error code always matches JSON 'code')
                        }
                    }).fail(function(jqxhr, code, exception) {
                        // TODO: Error handling
                        var data = $.parseJSON(jqxhr.responseText);
                        var code = data['code'];
                        var message = data['message'];
                        
                        result.html('So sorry! ' + message);
                        frm.hide();
                        result.show();  
                        
                        btn.removeAttr('disabled');
                        btn.html('Try again');
                        btn.addClass('restore');
                    }); 
                }
            }  
        }