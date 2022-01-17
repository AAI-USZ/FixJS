function (x, y, duration, easing, node) {
        // console.log('_onScrollTo: ', x, y);
        var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            index = paginator._cIndex,
            axis;

        if (gesture !== undefined) {
            axis = gesture.axis;

            if (axis === DIM_Y) {
                node = paginator.cards[index].node;
                x = 0;
            }
            else {
                node = host._cb;
                y = 0;
            }
        }

        host._scrollTo(x, y, duration, easing, node);

        return paginator._prevent;
    }