function(velocity) {

        // If you flick then click before the animation completes, this will stop it
        // todo: evaluate
        if (!this._gesture.flick) {
            this._onTransEnd();
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
            newX = currentX - (velocity * step),
            newY = currentY - (velocity * step);

        velocity = velocity * deceleration;

        // If we're past an edge, bounce back
        if (sv._isOOB()) {
            sv._afterOOB();
        }

        // If the velocity gets slow enough, just stop
        else if(Math.abs(velocity).toFixed(4) <= 0.015) {
            sv._onTransEnd();
        }

        // Or, animate another frame
        else {
            if (axis === DIM_X && axisX) {
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
    }