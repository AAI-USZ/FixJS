function(i, elt) {
        elt.alpha = 0;
        elt.textElement.fadeIn(textFadeDuration * 1000);
        $("body").append(elt.textElement);
    }