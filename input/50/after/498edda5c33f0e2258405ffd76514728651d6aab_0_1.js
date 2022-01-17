function scrollTo($el) {
        var top = $el.offset().top;
        $("html:not(:animated),body:not(:animated)").animate(
            { scrollTop: top - 20 },
            100
        );
    }