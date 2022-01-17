function() {
            if ($(topnavUserOptionsLoginFields).is(':visible')) {
                $(topnavUserOptionsLoginFields).hide();
            } else {
                $(topnavUserOptionsLoginFields).show();
                $(topnavUseroptionsLoginFieldsUsername).focus();
            }
        }