function () {
                if ( $that.attr('data-showing-placeholder') ) {
                    $that
                        .val('')
                        .css('color', original_color)
                        .removeAttr('data-showing-placeholder');
                }
            }