function(action_row, initialHide) {
                var data_row        = action_row.prev();
                var show_options    = data_row.find('.show-options');
                var hide_options    = data_row.find('.hide-options');
                var checkbox        = data_row.find('.information-checkbox');
                var instance        = this;

                if (initialHide && $('.action-row').length > 1)
                    collapse_row();
                else
                    expand_row();

                function expand_row()
                {
                    if (instance.adv_animation == 'True')
                        action_row.slideDown('fast');
                    else
                        action_row.show();
                    show_options.hide();
                    hide_options.show();
                    action_row.find('input[type=text]').eq(0).focus();
                    instance.handle_lazy(action_row);
                }

                function collapse_row()
                {
                    if (instance.adv_animation == 'True')
                        action_row.slideUp('fast');
                    else
                        action_row.hide();
                    show_options.show();
                    hide_options.hide();
                }

                function handle_checkbox_click()
                {
                    var hidden = $('#' + checkbox.attr('id').replace('checkbox_', 'hidden_checkbox_'));
                    hidden.attr('value', checkbox.is(':checked') ? 'true' : 'false');
                    if (!checkbox.is(':checked'))
                        $('#selector').attr('checked', false);
                }

                data_row.unbind().click(function(e){
                    if (action_row.is(':visible')) collapse_row(); else expand_row();
                    if (action_row.hasClass('empty-row'))
                    {
                        checkbox.attr('checked', !checkbox.attr('checked'));
                        handle_checkbox_click();
                    }
                    e.stopPropagation();
                });

                data_row.find('a').each(function(){
                    var link = $(this);
                    link.unbind().click(function(e){ e.stopPropagation(); });
                });

                show_options.unbind().click(function(){ expand_row(); return false; });
                hide_options.unbind().click(function(){ collapse_row(); return false; });

                action_row.find('.action-form').each(function(){
                    var form = $(this);
                    instance.connect_form(form, action_row, data_row);
                });

                action_row.find('.collapse-form').each(function(){
                    $(this).addClass('inline').removeClass('limit-width');
                });

                action_row.find('.action-link').each(function(){
                    var link = $(this);
                    if (!link.hasClass('form-via-ajax')) {
                        instance.connect_link(link, action_row, data_row);
                    }
                });

                checkbox.click(function(e){
                    handle_checkbox_click();
                    e.stopPropagation();
                });
                
                action_row.find('.form-via-ajax').each(function(){
                    var link = $(this);
                    
                    link.unbind().click(function(){
                        var action_name = link.text();
                        var title = link.data('confirm');
                        if (!title || title == "") {
                            title = action_name;
                        }
                        var submit_caption = link.data('submit');
                        if (!submit_caption || submit_caption == "") {
                            submit_caption = action_name;
                        }
                    
                        $.mbox_ajax_form(
                            title,
                            link.attr("href"),
                            submit_caption,
                            {
                                'width': '600px',
                                'response_type': RESPONSE_JSON,
                                'callback_ajax_posted_success': function(mbox_element, data){
                                    instance.replace_rows(data, action_row, data_row, link.data('next') == "true");
                                    return true;
                                }
                            }
                        );
                        
                        return false;
                    });
                });
            }