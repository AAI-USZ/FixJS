function() {
        var hide = function() {
                $('#column_selector').hide();
                $('.slide_arrow[data-arrow_direction="right"]').css({ right : '-1px' });
            },
            show = function() {
                $('#column_selector').show();
                $('.slide_arrow[data-arrow_direction="right"]').css({ right : '21px' });
            };

            return {
                show : show,
                hide : hide
            };

        }