function(velocity) {

        // If you flick then click before the animation completes, this will stop it
        // todo: evaluate
        if (!this._gesture.flick) {
            return;
        }

        var sv = this,
            gesture = sv._gesture,
            axis = gesture.flick.axis,
            currentX = sv.get(SCROLL_X),
            currentY = sv.get(SCROLL_Y),
            minX = sv._minScrollX,
            maxX = sv._maxScrollX,
            minY = sv._minScrollY,
            maxY = sv._maxScrollY,
            deceleration = sv._cDecel,
            bounce = sv._cBounce,
            axisX = sv._cAxisX,
            axisY = sv._cAxisY,
            step = ScrollView.FRAME_STEP,
            velocity = velocity * deceleration,
            newX = currentX - (velocity * step),
            newY = currentY - (velocity * step);

        // If we're past an edge, just bounce back
        if (sv._isOOB()) {
            sv._afterOOB();
            return;
        }

        // As the velocity gets slow enough, just stop
        if(Math.abs(velocity).toFixed(4) <= 0.015) {
            sv._onTransEnd();
            return;
        }
        else if (axis === DIM_X && axisX) {
            if (newX < minX || newX > maxX) {
                velocity *= bounce;
            }
            sv.set(SCROLL_X, newX);
        }
        else if (axis === DIM_Y && axisY) {
            if (newY < minY || newY > maxY) {
                velocity *= bounce;
            }

            sv.set(SCROLL_Y, newY);
        }

        Y.later(step, sv, '_flickFrame', [velocity]);
    }