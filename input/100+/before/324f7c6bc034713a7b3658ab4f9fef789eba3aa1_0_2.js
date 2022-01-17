function (evt) {
        var i, count = 0, pos,
            evtTouches = evt[JXG.touchProperty];

        evt.preventDefault();
        evt.stopPropagation();

        // Reduce update frequency for Android devices
        if (JXG.isWebkitAndroid()) {
            var ti = new Date();
            ti = ti.getTime();
            if (ti-this.touchMoveLast<80) {
                this.updateQuality = this.BOARD_QUALITY_HIGH;
                this.triggerEventHandlers(['touchmove', 'move'], evt, this.mode);

                return false;
            } else {
                this.touchMoveLast = ti;
            }
        }

        if (this.mode != this.BOARD_MODE_DRAG) {
            this.renderer.hide(this.infobox);
        }

        this.options.precision.hasPoint = this.options.precision.touch;

        if (!this.touchOriginMove(evt)) {

            if (this.mode == this.BOARD_MODE_DRAG) {
                // Runs over through all elements which are touched
                // by at least one finger.
                for (i = 0; i < this.touches.length; i++) {
                    // Touch by one finger:  this is possible for all elements that can be dragged
                    if (this.touches[i].targets.length === 1) {
                        if (evtTouches[this.touches[i].targets[0].num]) {
                            this.touches[i].targets[0].X = evtTouches[this.touches[i].targets[0].num].screenX;
                            this.touches[i].targets[0].Y = evtTouches[this.touches[i].targets[0].num].screenY;
                            pos = this.getMousePosition(evt, this.touches[i].targets[0].num);
                            this.moveObject(pos[0], pos[1], this.touches[i], evt, 'touch');
                        }
                        // Touch by two fingers: moving lines
                    } else if (this.touches[i].targets.length === 2 && this.touches[i].targets[0].num > -1 && this.touches[i].targets[1].num > -1) {
                        if (evtTouches[this.touches[i].targets[0].num] && evtTouches[this.touches[i].targets[1].num]) {
                            this.touches[i].targets[0].X = evtTouches[this.touches[i].targets[0].num].screenX;
                            this.touches[i].targets[0].Y = evtTouches[this.touches[i].targets[0].num].screenY;
                            this.touches[i].targets[1].X = evtTouches[this.touches[i].targets[1].num].screenX;
                            this.touches[i].targets[1].Y = evtTouches[this.touches[i].targets[1].num].screenY;
                            this.twoFingerMove(
                                this.getMousePosition(evt, this.touches[i].targets[0].num),
                                this.getMousePosition(evt, this.touches[i].targets[1].num),
                                this.touches[i],
                                evt
                            );
                        }
                    }
                }
            }
        }

        if (this.mode != this.BOARD_MODE_DRAG) {
            this.renderer.hide(this.infobox);
        }

        this.options.precision.hasPoint = this.options.precision.mouse;
        this.triggerEventHandlers(['touchmove', 'move'], evt, this.mode);

        return false;
    }