f        // Container in which the AJAX view is placed
        var container = $('<div />').html('<img alt="" src="' + JS_STATIC_URL + 'advanced_reports/img/modybox/loading.gif" />' + _('Loading...'));

        // Create mbox
        var settings = { // These settings cannot be overridden in optional_settings
            'type': DIALOG_YES_NO,
            'btn_caption_yes': save_caption,
            'btn_caption_no': _('Cancel'),
            'callback_yes': function() {
                var close = false;
                mbox_footer.find('input').attr("disabled", "disabled");
                
                $.ajax({
                    'url': url,
                    //'dataType': 'html',
                    'type': 'POST',
                    'data': container.find('form').serialize(),
                    'success': function(data) {
                        close = false;
                        if (optional_settings["callback_ajax_submit_success"] != undefined)
                            close = optional_settings["callback_ajax_submit_success"]($.mbox.element, data);
                        
                        if (close) {
                            $.mbox.close();
                        } else {
                            mbox_footer.find('input').removeAttr("disabled");
                            container.find('input[type=submit]').hide();
                            var content = data;
                            var looks_like_json = $.inArray($.trim(data)[0], ['{', '[', '"']) != -1;
                            
                            if (optional_settings['response_type'] == RESPONSE_JSON && looks_like_json) {
                                json = JSON.parse(data);
                                if (json.status == 'SUCCESS') {
                                    close = true;
                                    content = json.content;
                                } else {
                                    data = json.content;
                                }
                            } else {
                                if (data == 'OK') {
                                    close = true;
                                }
                            }
                            
                            if (close) {
                                if (optional_settings["callback_ajax_posted_success"] != undefined)
                                    optional_settings["callback_ajax_posted_success"]($.mbox.element, content);
                                $.mbox.close();
                            } else {
                                container.html(data);
                                container.find('input[type=submit]').hide();
                                $.mbox.reposition_box();
                            }
                        }
                    },
                    'error': function() {
                        mbox_footer.find('input').removeAttr("disabled");
                        $('#mbox_wrap').removeClass("mbox_error").addClass("mbox_error");
                        container.html(_("Woops! Something went wrong. Please try again later."));
                        $.mbox.reposition_box();
                    }
                });
                return close;
            }
        };

        var settings = $.extend(false, { }, optional_settings, settings);
        $.mbox(title, container, settings);

        // Load AJAX content
        $.ajax({
            'url': url,
            'dataType': 'html',
            'success': function(data){
                close = false;
                if (optional_settings != undefined && optional_settings["callback_ajax_before_loaded"] != undefined)
                    close = optional_settings["callback_ajax_before_loaded"]($.mbox.element, data);
                
                if (close) {
                    $.mbox.close();
                } else {
                    container.html(data);
                    container.find('input[type=submit]').hide();
                    $.mbox.reposition_box();
    
                    if (optional_settings != undefined && optional_settings["callback_ajax_loaded_success"] != undefined)
                        optional_settings["callback_ajax_loaded_success"]($.mbox.element, data);
                }
            },
            'error': function(xhr, ajaxOptions, thrownError){
                $('#mbox_wrap').removeClass("mbox_error").addClass("mbox_error");
                container.html($('<div/>').addClass("error").html(_('Loading error...')).after($('<p/>').html("<br/>" + xhr.status + " " + thrownError)));
                $.mbox.reposition_box();
            }
        });
    };
