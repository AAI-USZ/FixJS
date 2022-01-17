function (e) {
                e.preventDefault();

                $submitbutton = $(this);
                $submitbutton.css('cursor', 'default');
                $submitbutton.prop('disabled', true);
                $submitbutton.parent().find('.waiting').fadeIn();

                $('.pods-admin form').trigger('submit');
            }