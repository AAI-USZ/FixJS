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

        // Only if this gesture wasn't a flick, and there was movement
        if (!flick && gesture.deltaX !== null && gesture.deltaY !== null) {
            isOOB = sv._isOOB();
            if (isOOB) {
                sv._afterOOB();
            }
            else {
                // Don't fire scrollEnd on the gesture axis is the same as paginator's
                // Not totally confident this is a good idea
                if (sv.pages && sv.pages.get('axis') !== gesture.axis) {
                    sv._onTransEnd();   
                } 
            }
        }
    }