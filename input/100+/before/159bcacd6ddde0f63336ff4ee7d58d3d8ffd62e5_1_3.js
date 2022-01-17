function(e) {
        var sv = this,
            scrollY = sv.get(SCROLL_Y),
            bb = sv._bb,
            scrollOffset = 10, // 10px
            scrollToY = scrollY - (e.wheelDelta * scrollOffset);

        if (bb.contains(e.target)){

            if (scrollToY >= sv._minScrollY && scrollToY <= sv._maxScrollY) {
                sv.set(SCROLL_Y, scrollToY);

                // if we have scrollbars plugin, update & set the flash timer on the scrollbar
                // TODO: This probably shouldn't be in this module
                if (sv.scrollbars) {
                    // TODO: The scrollbars should handle this themselves
                    sv.scrollbars._update();
                    sv.scrollbars.flash();
                    // or just this
                    // sv.scrollbars._hostDimensionsChange();
                }
            }

            // prevent browser default behavior on mouse scroll
            e.preventDefault();
        }
    }