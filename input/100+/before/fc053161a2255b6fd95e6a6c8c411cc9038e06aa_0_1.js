function () {
        var that = this;
        var $that = $(that);
        var placeholder_text = $that.attr('placeholder');
        var original_color = $that.css('color');
        if ( 1 > $that.val().length ) {
            $that
                .val(placeholder_text)
                .css('color', 'GrayText')
                .attr('data-showing-placeholder', 'showing');
        }
        $that
            .focus( function () {
                if ( $that.attr('data-showing-placeholder') ) {
                    $that
                        .val('')
                        .css('color', original_color)
                        .removeAttr('data-showing-placeholder');
                }
            })
            .blur( function () {
                if ( 1 > $that.val().length) {
                    $that.val(placeholder_text)
                        .css('color', 'GrayText')
                        .attr('data-showing-placeholder', 'showing');
                }
            })
            .parents('form').submit( function () {
                if ( $that.attr('data-showing-placeholder') ) {
                    $that.removeAttr('data-showing-placeholder');
                    $that.val('');
                }
            });
    }