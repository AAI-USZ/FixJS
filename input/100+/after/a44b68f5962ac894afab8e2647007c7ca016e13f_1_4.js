function(e) {

        var sv = this,
            gesture = sv._gesture,
            axisX = sv._cAxisX,
            axisY = sv._cAxisY,
            startX = gesture.startX,
            startY = gesture.startY,
            startClientX = gesture.startClientX,
            startClientY = gesture.startClientY,
            clientX = e.clientX,
            clientY = e.clientY,
            newX, newY;

        if (sv._prevent.move) {
            e.preventDefault();
        }

        gesture.deltaX = startClientX - clientX;
        gesture.deltaY = startClientY - clientY;

        if (gesture.axis === null) {
            gesture.axis = (Math.abs(gesture.deltaX) > Math.abs(gesture.deltaY)) ? DIM_X : DIM_Y;
        }

        if (gesture.axis === DIM_X && sv._cAxisX) {
            newX = startX + gesture.deltaX;
            sv.set(SCROLL_X, newX);
        }

        if (gesture.axis === DIM_Y && sv._cAxisY) {
            newY = startY + gesture.deltaY;
            sv.set(SCROLL_Y, newY);
        }
    }