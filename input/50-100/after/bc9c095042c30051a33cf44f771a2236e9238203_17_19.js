function() {
                $(topnavUserOptionsLoginFields).hide();
                if ($(this).children(topnavigationExternalLogin).length) {
                    $(this).children(topnavigationExternalLogin).find('ul').attr('aria-hidden', 'true');
                }
            }