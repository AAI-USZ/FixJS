function (e) {
                changed = false;

                e.preventDefault();

                $submitbutton = $(this);
                $submitbutton.css('cursor', 'default');
                $submitbutton.prop('disabled', true);
                $submitbutton.parent().find('.waiting').fadeIn();

                $('form.pods-submittable').trigger('submit');
            }