function (e) {
                e.preventDefault();

                pods_ajaxurl = $('.pods-admin form').attr('action');
                pods_ajaxurl = pods_ajaxurl.replace(/\?nojs\=1/, '?pods_ajax=1');
                if ('undefined' != typeof ajaxurl && ('' == pods_ajaxurl || '?pods_ajax=1' == pods_ajaxurl || document.location.href == pods_ajaxurl || document.location.href.replace(/\?nojs\=1/, '?pods_ajax=1') == pods_ajaxurl))
                    pods_ajaxurl = ajaxurl + '?pods_ajax=1';

                postdata = {
                    field_data: {}
                };
                var valid_form = true;
                $(this).find('.pods-submittable-fields' ).find('input, select, textarea').each(function () {
                    var $el = $(this);
                    var val = $el.val();
                    if ('' != $el.prop('name')) {
                        if ($el.is('input[type=checkbox]') && 1 == val && !$el.is(':checked'))
                            val = 0;
                        else if ($el.is('input[type=radio]') && !$el.is(':checked'))
                            val = '';
                        if ($el.is(':visible') && $el.hasClass('pods-validate pods-validate-required') && ('' == $el.val() || 0 == $el.val())) {
                            if (0 == $el.parent().find('.pods-validate-error-message').length)
                                $el.parent().append('<div class="pods-validate-error-message">' + $el.parent().find('label').html().trim() + ' is required.</div>');
                            if (false !== valid_form)
                                $el.focus();
                            $el.addClass('pods-validate-error');
                            $el.focus();
                            valid_form = false;
                        }
                        else {
                            $el.parent().find('.pods-validate-error-message').remove();
                            $el.removeClass('pods-validate-error');
                        }
                        postdata[$el.prop('name')] = val;
                    }
                });
                if (false === valid_form) {
                    $submitbutton.css('cursor', 'pointer');
                    $submitbutton.prop('disabled', false);
                    $submitbutton.parent().find('.waiting').fadeOut();
                    return false;
                }

                pods_ajaxurl = pods_ajaxurl + '&action=' + postdata.action;

                $.ajax({
                    type: 'POST',
                    url: pods_ajaxurl,
                    cache: false,
                    data: postdata,
                    success: function (d) {
                        $submitbutton.css('cursor', 'pointer');
                        $submitbutton.prop('disabled', false);
                        $submitbutton.parent().find('.waiting').fadeOut();
                        if (-1 == d.indexOf('<e>') && -1 != d) {
                            if ('undefined' != typeof pods_admin_submit_callback)
                                pods_admin_submit_callback(d);
                            else if ( 'undefined' != typeof $submitbutton.data('location') )
                                document.location.href = $submitbutton.data('location');
                            else
                                document.location.reload( true );
                        }
                        else if ('undefined' != typeof pods_admin_submit_error_callback)
                            pods_admin_submit_error_callback(d.replace('<e>', '').replace('</e>', ''));
                        else if ( 'undefined' != typeof $submitbutton.data('error-location') )
                            document.location.href = $submitbutton.data('error-location');
                        else
                            alert('Error: ' + d.replace('<e>', '').replace('</e>', ''));
                    },
                    error: function () {
                        $submitbutton.css('cursor', 'pointer');
                        $submitbutton.prop('disabled', false);
                        $submitbutton.parent().find('.waiting').fadeOut();
                        alert('Unable to process request, please try again.');
                    },
                    dataType: 'html'
                });

            }