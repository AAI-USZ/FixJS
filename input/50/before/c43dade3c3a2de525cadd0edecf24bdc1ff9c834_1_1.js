function(e, a) {
                        paginator.setRowsPerPage(a.count);
                        jQuery.post( jQuery.ez.url.replace( 'ezjscore/', 'user/preferences/set_and_exit/admin_list_limit/' ) + a.id );
                    }