function (d) {
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
                    }