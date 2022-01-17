function(i, elt) {
        elt.alpha = 0;

        elt.textElement.css("opacity", 0);
        elt.textElement.animate({
            opacity: 0.4,
        }, textFadeDuration * 1000, function() {
            // this is so that opacity is controlled via css
            $(this).css("opacity", "");
        });
        $("body").append(elt.textElement);
    }