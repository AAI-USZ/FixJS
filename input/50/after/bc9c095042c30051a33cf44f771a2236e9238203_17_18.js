function() {
                if ($('#navigation_anon_signup_link:focus').length) {
                    $('#navigation_anon_signup_link:focus').blur();
                }
                closeMenu();
                closePopover();
                $(topnavUserOptionsLoginFields).show();
            }