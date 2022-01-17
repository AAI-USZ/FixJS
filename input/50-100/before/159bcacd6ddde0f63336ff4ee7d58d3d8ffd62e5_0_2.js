function (e) {
        var paginator = this,
            host = paginator._host,
            bb = host._bb,
            isForward = e.wheelDelta < 0, // down (negative) is forward.  @TODO Should revisit.
            axis = paginator.get(AXIS);

        // Only if the mousewheel event occurred on a DOM node inside the BB
        if (bb.contains(e.target) && axis === DIM_Y){
            if (isForward) {
                paginator.next();
            }
            else {
                paginator.prev();
            }

            // prevent browser default behavior on mousewheel
            e.preventDefault();

            // Block host._mousewheel from running
            return paginator._prevent;
        }
    }