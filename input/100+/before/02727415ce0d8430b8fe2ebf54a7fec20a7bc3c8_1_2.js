function(data, endpoint_data, target, callbacks) {
            var THIS = this,
                endpoint_html = THIS.templates.endpoint.tmpl(endpoint_data);

            $.each($('.pbxs .pbx', endpoint_html), function() {
                if($(this).dataset('pbx_name') === endpoint_data.server_type) {
                    $(this).addClass('selected');
                    $('.pbxs .pbx:not(.selected)', endpoint_html).css('opacity', '0.5');
                    return false;
                }
            });

            if(endpoint_data.server_type && $('.pbxs .pbx.selected', endpoint_html).size() === 0) {
                $('.pbxs .pbx.other', endpoint_html).addClass('selected');
                $('.pbxs .pbx:not(.selected)', endpoint_html).css('opacity', '0.5');
            }

            if(!endpoint_data.server_type) {
                $('.info_pbx', endpoint_html).hide();
            }

            $('.endpoint.edit', endpoint_html).click(function(ev) {
                ev.preventDefault();
                var form_data = form2object('endpoint');
                form_data.server_type = $('.pbxs .selected', endpoint_html).dataset('pbx_name');
                if(form_data.server_type === 'other') {
                    form_data.server_type = $('#other_name', endpoint_html).val();
                }

                THIS.get_account(function(global_data) {
                    THIS.save_endpoint(form_data, global_data, function(_data) {
                        if(typeof callbacks.save_success == 'function') {
                            callbacks.save_success(_data);
                        }
                    });
                });
            });

            $('.endpoint.delete', endpoint_html).click(function(ev) {
                ev.preventDefault();

                data.data.servers.splice(endpoint_data.extra.id,1);

                THIS.update_old_trunkstore(data.data, callbacks.delete_success);
            });

            $('.pbxs .pbx', endpoint_html).click(function() {
                $('.info_pbx', endpoint_html).show();
                $('.pbxs .pbx', endpoint_html).removeClass('selected').css('opacity', '0.5');
                $(this).addClass('selected');

                $('.selected_pbx_block', endpoint_html).slideDown('fast');
                $('.selected_pbx', endpoint_html).html($('.pbxs .selected', endpoint_html).dataset('pbx_name'));

                if($(this).hasClass('other')) {
                    $('.selected_pbx_block', endpoint_html).hide();
                    $('.other_name_wrapper', endpoint_html).slideDown();
                    $('#other_name', endpoint_html).focus();
                }
                else {
                    $('.other_name_wrapper', endpoint_html).hide();
                    $('.selected_pbx_block', endpoint_html).slideDown();
                    $('input[name="auth.auth_user"]', endpoint_html).focus();
                }
            });

            (target).empty()
                    .append(endpoint_html);

            /* Hack to display the selected PBX first in the list
               Or if new, scroll to the first pbx */
            $('.pbxs', endpoint_html).animate({ scrollLeft: 0 }, 0);

            var pbx_type = (endpoint_data.server_type || 'other').replace('.', '').toLowerCase();

            $.inArray(pbx_type, THIS.list_available_pbxs()) < 0 ? pbx_type = 'other' : true;

            var a = $('.pbxs', endpoint_html).offset().left,
                b = endpoint_data.server_type ? $('.pbxs .' + pbx_type, endpoint_html).offset().left : a;

            $('.pbxs', endpoint_html).animate({ scrollLeft: b-a }, 0);
        }