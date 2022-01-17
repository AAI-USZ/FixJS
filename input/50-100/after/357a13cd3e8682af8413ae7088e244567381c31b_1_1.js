function () {
        var nxt = $(this).next();
        if (nxt.hasClass("hidden")) {
            nxt.slideDown("fast");
            nxt.removeClass("hidden");
        } else {
            nxt.slideUp("fast");
            nxt.addClass("hidden");
        }
    }