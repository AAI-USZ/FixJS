function(elem) {

        var docViewTop = jQuery(".console .autocomplete").scrollTop();

        var docViewBottom = docViewTop

                + jQuery(".console .autocomplete").height();



        var elemTop = jQuery(elem).offset().top

                - jQuery(".console .autocomplete ul").offset().top;

        var elemBottom = elemTop + jQuery(elem).outerHeight();



        var isVisible = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));

        if (isVisible) {

            return;

        }



        // calculates the signal using the relative position of the

        // element to determine if it should be negative or positive

        var signal = elemTop > docViewTop ? 1 : -1;



        // retrieves the previous scroll top and uses it to calculate

        // the new one using an optimistic approach

        var previous = jQuery(".console .autocomplete").scrollTop();

        jQuery(".console .autocomplete").scrollTop(previous

                + (elemBottom - elemTop) * signal);

    }