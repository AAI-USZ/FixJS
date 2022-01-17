function (evt) {
        var i, j, k,
            eps = this.options.precision.touch,
            tmpTouches = [], found, foundNumber,
            evtTouches = evt[JXG.touchProperty];

        this.triggerEventHandlers(['touchend', 'up'], evt);
        this.renderer.hide(this.infobox);

        if (evtTouches.length > 0) {
            for (i = 0; i < this.touches.length; i++) {
                tmpTouches[i] = this.touches[i];
            }
            this.touches.length = 0;

            // assuming only points can be moved
            // todo: don't run through the targettouches but through the touches and check if all touches.targets are still available
            // if not, try to convert the operation, e.g. if a lines is rotated and translated with two fingers and one finger is lifted,
            // convert the operation to a simple one-finger-translation.
            // ADDENDUM 11/10/11:
            // see addendum to touchStartListener from 11/10/11
            // (1) run through the tmptouches
            // (2) check the touches.obj, if it is a
            //     (a) point, try to find the targettouch, if found keep it and mark the targettouch, else drop the touch.
            //     (b) line with
            //          (i) one target: try to find it, if found keep it mark the targettouch, else drop the touch.
            //         (ii) two targets: if none can be found, drop the touch. if one can be found, remove the other target. mark all found targettouches
            //     (c) circle with [proceed like in line]

            // init the targettouches marker
            for (i = 0; i < evtTouches.length; i++) {
                evtTouches[i].jxg_isused = false;
            }

            for (i = 0; i < tmpTouches.length; i++) {
                // could all targets of the current this.touches.obj be assigned to targettouches?
                found = false;
                foundNumber = 0;

                for (j = 0; j < tmpTouches[i].targets.length; j++) {
                    tmpTouches[i].targets[j].found = false;
                    for (k = 0; k < evtTouches.length; k++) {
                        if (Math.abs(Math.pow(evtTouches[k].screenX - tmpTouches[i].targets[j].X, 2) + Math.pow(evtTouches[k].screenY - tmpTouches[i].targets[j].Y, 2)) < eps*eps) {
                            tmpTouches[i].targets[j].found = true;
                            tmpTouches[i].targets[j].num = k;
                            tmpTouches[i].targets[j].X = evtTouches[k].screenX;
                            tmpTouches[i].targets[j].Y = evtTouches[k].screenY;
                            foundNumber++;
                            break;
                        }
                    }
                }

                if (JXG.isPoint(tmpTouches[i].obj)) {
                    found = (tmpTouches[i].targets[0] && tmpTouches[i].targets[0].found);
                } else if (tmpTouches[i].obj.elementClass === JXG.OBJECT_CLASS_LINE) {
                    found = (tmpTouches[i].targets[0] && tmpTouches[i].targets[0].found) || (tmpTouches[i].targets[1] && tmpTouches[i].targets[1].found);
                } else if (tmpTouches[i].obj.elementClass === JXG.OBJECT_CLASS_CIRCLE) {
                    found = foundNumber === 1 || foundNumber === 3;
                }

                // if we found this object to be still dragged by the user, add it back to this.touches
                if (found) {
                    this.touches.push({
                        obj: tmpTouches[i].obj,
                        targets: []
                    });

                    for (j = 0; j < tmpTouches[i].targets.length; j++) {
                        if (tmpTouches[i].targets[j].found) {
                            this.touches[this.touches.length-1].targets.push({
                                num: tmpTouches[i].targets[j].num,
                                X: tmpTouches[i].targets[j].screenX,
                                Y: tmpTouches[i].targets[j].screenY,
                                Xprev: NaN,
                                Yprev: NaN,
                                Xstart: tmpTouches[i].targets[j].Xstart,
                                Ystart: tmpTouches[i].targets[j].Ystart,
                                Zstart: tmpTouches[i].targets[j].Zstart
                            });
                        }
                    }

                } else {
                    delete this.highlightedObjects[tmpTouches[i].obj.id];
                    tmpTouches[i].obj.noHighlight();
                }
            }

        } else {
            this.touches.length = 0;
        }

        for (i = 0; i < this.downObjects.length; i++) {
            found = false;
            for (j = 0; j < this.touches.length; j++) {
                if (this.touches[j].obj.id == this.downObjects[i].id) {
                    found = true;
                }
            }
            if (!found) {
                this.downObjects[i].triggerEventHandlers(['touchup', 'up'], evt);
                this.downObjects[i].snapToGrid();
                this.downObjects.splice(i, 1);
            }
        }

        if (!evtTouches || evtTouches.length === 0) {
            JXG.removeEvent(document, 'touchend', this.touchEndListener, this);
            this.hasTouchEnd = false;

            this.dehighlightAll();
            this.updateQuality = this.BOARD_QUALITY_HIGH;

            this.originMoveEnd();
            this.update();
        }
    }