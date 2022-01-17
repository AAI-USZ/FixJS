function(e) {

        if (!this._cDisabled) {
            var sv = this,
                bb = sv._bb,
                axisX = sv.get(AXIS_X),
                axisY = sv.get(AXIS_Y),
                currentX = sv.get(SCROLL_X),
                currentY = sv.get(SCROLL_Y);

            sv._cAxisX = axisX;
            sv._cAxisY = axisY;

            if (sv._prevent.start) {
                e.preventDefault();
            }

            sv._gesture = {
                axis: null,

                // The current attribute values
                startX: currentX,
                startY: currentY,

                // The X/Y coordinates where the event began
                startClientX: e.clientX,
                startClientY: e.clientY,

                // The X/Y coordinates where the event will end
                endClientX: null,
                endClientY: null,

                // The current delta of the event
                deltaX: null,
                deltaY: null,

                // Will be populated for flicks
                flick: null,

                // Create some listeners for the rest of the gesture cycle
                onGestureMove: bb.on(DRAG + '|gesturemove', Y.bind(sv._onGestureMove, sv)),
                onGestureMoveEnd: bb.on(DRAG + '|gesturemoveend', Y.bind(sv._onGestureMoveEnd, sv))
            };
        }
    }