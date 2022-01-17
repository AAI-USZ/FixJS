function isScrolledIntoView(elem) {

        var docViewTop = $(".console").scrollTop();

        var docViewBottom = docViewTop + $(".console").outerHeight();



        var elemTop = $(elem).offset().top;

        var elemBottom = elemTop + $(elem).outerHeight();



        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));

    }