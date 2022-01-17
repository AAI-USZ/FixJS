function (e) {
                e.preventDefault();

                var $el = $(this);

                pods_ajaxurl = $el.data('ajaxurl');
                if ('undefined' != typeof pods_ajaxurl)
                    pods_ajaxurl = pods_ajaxurl.replace(/\?nojs\=1/, '?pods_ajax=1');
                else if ('undefined' != typeof ajaxurl && ('undefined' == typeof pods_ajaxurl || '' == pods_ajaxurl || '?pods_ajax=1' == pods_ajaxurl || document.location.href == pods_ajaxurl || document.location.href.replace(/\?nojs\=1/, '?pods_ajax=1') == pods_ajaxurl))
                    pods_ajaxurl = ajaxurl + '?pods_ajax=1';

                var postdata = $el.data();

                if ( 'undefined' != typeof $el.data( 'confirm' ) && !confirm( $el.data( 'confirm' ) ) )
                    return false;

                changed = false;

                pods_ajaxurl = pods_ajaxurl + '&action=' + postdata.action;

                $.ajax({
                    type: 'POST',
                    url: pods_ajaxurl,
                    cache: false,
                    data: postdata,
                    success: function (d) {
                        if (-1 == d.indexOf('<e>') && -1 != d) {
                            if ('undefined' != typeof pods_admin_submit_callback)
                                pods_admin_submit_callback(d);
                            else if ( 'undefined' != typeof $el.data('location') )
                                document.location.href = $el.data('location');
                            else
                                document.location.reload( true );
                        }
                        else if ('undefined' != typeof pods_admin_submit_error_callback)
                            pods_admin_submit_error_callback(d.replace('<e>', '').replace('</e>', ''));
                        else if ( 'undefined' != typeof $el.data('error-location') )
                            document.location.href = $el.data('error-location');
                        else
                            alert('Error: ' + d.replace('<e>', '').replace('</e>', ''));
                    },
                    error: function () {
                        alert('Unable to process request, please try again.');
                    },
                    dataType: 'html'
                });
            }