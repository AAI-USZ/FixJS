function() {
            if ($(topnavUserDropdown).is(':visible')) {
                $(topnavUserDropdown).hide();
            } else {
                $(topnavUserDropdown).show();
                $(topnavUserDropdown).css('display', 'inline');
            }
        }