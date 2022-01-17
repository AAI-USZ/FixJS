function triggerImg(index) {
        var tabs = $(".slide-side .yui3-tabs-trigger");
        tabs.removeClass(".slide-side yui3-tabs-trigger-selected");
        var tab = tabs.eq(index);
        tab.addClass("yui3-tabs-trigger-selected");

        $(".slide-main .yui3-tabs-panel-selected").fadeOut();
        var imgs = $(".slide-main .yui3-tabs-panel");
        imgs.removeClass("yui3-tabs-panel-selected");
        var img = imgs.eq(index);
        img.addClass("yui3-tabs-panel-selected");
        $(".slide-main .yui3-tabs-panel-selected").fadeIn();
    }