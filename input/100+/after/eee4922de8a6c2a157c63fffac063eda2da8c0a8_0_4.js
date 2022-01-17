function (d) {
                        if (-1 == d.indexOf('<e>') && -1 != d) {
                            if ('undefined' != typeof pods_admin_submit_callback)
                                pods_admin_submit_callback(d);
                            else if ( 'undefined' != typeof $( this ).data('location') )
                                document.location.href = $( this ).data('location');
                            else
                                document.location.reload( true );
                        }
                        else if ('undefined' != typeof pods_admin_submit_error_callback)
                            pods_admin_submit_error_callback(d.replace('<e>', '').replace('</e>', ''));
                        else if ( 'undefined' != typeof $( this ).data('error-location') )
                            document.location.href = $( this ).data('error-location');
                        else
                            alert('Error: ' + d.replace('<e>', '').replace('</e>', ''));
                    }