function(innerBoxSelector){

    var parent = this;
    var innerBox = parent.children(innerBoxSelector);

    parent.siblings(".scrollShadows-overlay").remove();
    parent.unbind("scroll");
    var overlay = $("<span>").addClass("scrollShadows-overlay");
    overlay.css({
        left: parent.position().left + "px",
        top: parent.position().top + "px",
        height: parent.height() + "px",
        width: innerBox.width() + "px"
    });


    parent.after(overlay);

    var scrollHandler = function(e){
        // Don't do shadows if there's no scrolling happening
        if(innerBox.height() <= parent.height())
            return;

        var scrollTop = $(this).scrollTop();

        if(scrollTop === 0){
            overlay.addClass("top");
            overlay.removeClass("bottom middle");
        } else if (scrollTop >= (innerBox.height() - parent.height())){
            overlay.addClass("bottom");
            overlay.removeClass("top middle");
        } else {
            overlay.addClass("middle");
            overlay.removeClass("top bottom");
        }
    };

    var throttledScrollHandler = $.throttle(20, scrollHandler);
    parent.scroll(throttledScrollHandler);
    parent.scroll(); // kickoff
  }