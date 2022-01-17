function () {
                if ( $that.attr('data-showing-placeholder') ) {
                    $that
                        .val('')
                        .css('color', '#2b2b2b')
                        .removeAttr('data-showing-placeholder');
                }
            }