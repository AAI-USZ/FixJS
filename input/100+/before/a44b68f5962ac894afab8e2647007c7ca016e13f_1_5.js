function(e) {

        var sv = this,
            gesture = sv._gesture,
            flick = gesture.flick,
            clientX = e.clientX,
            clientY = e.clientY,
            isOOB;

        if (sv._prevent.end) {
            e.preventDefault();
        }

        gesture.endClientX = clientX;
        gesture.endClientY = clientY;

        gesture.onGestureMove.detach();
        gesture.onGestureMoveEnd.detach();

        if (!flick) {
            isOOB =  sv._isOOB();
            if (isOOB) {
                sv._afterOOB();
            } else {
                sv._onTransEnd();    
            }
        }
    }