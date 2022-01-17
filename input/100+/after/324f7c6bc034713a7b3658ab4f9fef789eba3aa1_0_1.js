function (evt) {
        var i, pos, elements, j, k, l,
            eps = this.options.precision.touch,
            obj, xy = [], found, targets,
            evtTouches = evt[JXG.touchProperty];

        if (!this.hasTouchEnd) {
            JXG.addEvent(document, 'touchend', this.touchEndListener, this);
            this.hasTouchEnd = true;
        }

        if (this.hasMouseHandlers) {
			this.removeMouseEventHandlers();
        }

        // prevent accidental selection of text
        if (document.selection && typeof document.selection.empty == 'function') {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }

        // move origin - but only if we're not in drag mode
        if (this.mode === this.BOARD_MODE_NONE && this.touchOriginMoveStart(evt)) {
            this.triggerEventHandlers(['touchstart', 'down'], evt);
            return false;
        }

        // multitouch
        this.options.precision.hasPoint = this.options.precision.touch;

        // assuming only points are getting dragged
        // todo: this is the most critical part. first we should run through the existing touches and collect all targettouches that don't belong to our
        // previous touches. once this is done we run through the existing touches again and watch out for free touches that can be attached to our existing
        // touches, e.g. we translate (parallel translation) a line with one finger, now a second finger is over this line. this should change the operation to
        // a rotational translation. or one finger moves a circle, a second finger can be attached to the circle: this now changes the operation from translation to
        // stretching. as a last step we're going through the rest of the targettouches and initiate new move operations:
        //  * points have higher priority over other elements.
        //  * if we find a targettouch over an element that could be transformed with more than one finger, we search the rest of the targettouches, if they are over
        //    this element and add them.
        // ADDENDUM 11/10/11:
        // to allow the user to drag lines and circles with multitouch we have to change this here. some notes for me before implementation:
        //  (1) run through the touches control object,
        //  (2) try to find the targetTouches for every touch. on touchstart only new touches are added, hence we can find a targettouch
        //      for every target in our touches objects
        //  (3) if one of the targettouches was bound to a touches targets array, mark it
        //  (4) run through the targettouches. if the targettouch is marked, continue. otherwise check for elements below the targettouch:
        //      (a) if no element could be found: mark the target touches and continue
        //      --- in the following cases, "init" means:
        //           (i) check if the element is already used in another touches element, if so, mark the targettouch and continue
        //          (ii) if not, init a new touches element, add the targettouch to the touches property and mark it
        //      (b) if the element is a point, init
        //      (c) if the element is a line, init and try to find a second targettouch on that line. if a second one is found, add and mark it
        //      (d) if the element is a circle, init and try to find TWO other targettouches on that circle. if only one is found, mark it and continue. otherwise
        //          add both to the touches array and mark them.
        for (i = 0; i < evtTouches.length; i++) {
            evtTouches[i].jxg_isused = false;
        }

        for (i = 0; i < this.touches.length; i++) {
            for (j = 0; j < this.touches[i].targets.length; j++) {
                this.touches[i].targets[j].num = -1;
                eps = this.options.precision.touch;

                do {
                    for (k = 0; k < evtTouches.length; k++) {
                        // find the new targettouches
                        if (Math.abs(Math.pow(evtTouches[k].screenX - this.touches[i].targets[j].X, 2) +
                            Math.pow(evtTouches[k].screenY - this.touches[i].targets[j].Y, 2)) < eps*eps) {
                            this.touches[i].targets[j].num = k;

                            this.touches[i].targets[j].X = evtTouches[k].screenX;
                            this.touches[i].targets[j].Y = evtTouches[k].screenY;
                            evtTouches[k].jxg_isused = true;
                            break;
                        }
                    }

                    eps *= 2;

                } while (this.touches[i].targets[j].num == -1 && eps < this.options.precision.touchMax);

                if (this.touches[i].targets[j].num === -1) {
                    JXG.debug('i couldn\'t find a targettouches for target no ' + j + ' on ' + this.touches[i].obj.name + ' (' + this.touches[i].obj.id + '). Removed the target.');
                    JXG.debug('eps = ' + eps + ', touchMax = ' + JXG.Options.precision.touchMax);
                    this.touches[i].targets.splice(i, 1);
                }

            }
        }

        // we just re-mapped the targettouches to our existing touches list. now we have to initialize some touches from additional targettouches
        for (i = 0; i < evtTouches.length; i++) {
            if (!evtTouches[i].jxg_isused) {
                pos = this.getMousePosition(evt, i);
                elements = this.initMoveObject(pos[0], pos[1], evt, 'touch');

                if (elements.length != 0) {
                    obj = elements[elements.length-1];

                    if (JXG.isPoint(obj) || obj.type === JXG.OBJECT_TYPE_TEXT) {
                        // it's a point, so it's single touch, so we just push it to our touches

                        targets = [{ num: i, X: evtTouches[i].screenX, Y: evtTouches[i].screenY, Xprev: NaN, Yprev: NaN, Xstart: [], Ystart: [], Zstart: [] }];

                        // For the UNDO/REDO of object moves
                        xy = this.initXYstart(obj);
                        for (l=0; l<xy.length; l++) {
                            targets[0].Xstart.push(xy[l][1]);
                            targets[0].Ystart.push(xy[l][2]);
                            targets[0].Zstart.push(xy[l][0]);
                        }

                        this.touches.push({ obj: obj, targets: targets });
                        this.highlightedObjects[obj.id] = obj;
                        obj.highlight(true);
                    } else if (obj.elementClass === JXG.OBJECT_CLASS_LINE || obj.elementClass === JXG.OBJECT_CLASS_CIRCLE) {
                        found = false;
                        // first check if this line is already capture in this.touches
                        for (j = 0; j < this.touches.length; j++) {
                            if (obj.id === this.touches[j].obj.id) {
                                found = true;
                                // only add it, if we don't have two targets in there already
                                if (this.touches[j].targets.length === 1) {

                                    var target = { num: i, X: evtTouches[i].screenX, Y: evtTouches[i].screenY, Xprev: NaN, Yprev: NaN, Xstart: [], Ystart: [], Zstart: [] };

                                    // For the UNDO/REDO of object moves
                                    xy = this.initXYstart(obj);
                                    for (l=0; l<xy.length; l++) {
                                        target.Xstart.push(xy[l][1]);
                                        target.Ystart.push(xy[l][2]);
                                        target.Zstart.push(xy[l][0]);
                                    }

                                    this.touches[j].targets.push(target);
                                }

                                evtTouches[i].jxg_isused = true;
                            }
                        }

                        // we couldn't find it in touches, so we just init a new touches
                        // IF there is a second touch targetting this line, we will find it later on, and then add it to
                        // the touches control object.
                        if (!found) {
                            targets = [{ num: i, X: evtTouches[i].screenX, Y: evtTouches[i].screenY, Xprev: NaN, Yprev: NaN, Xstart: [], Ystart: [], Zstart: [] }];

                            // For the UNDO/REDO of object moves
                            xy = this.initXYstart(obj);
                            for (l=0; l<xy.length; l++) {
                                targets[0].Xstart.push(xy[l][1]);
                                targets[0].Ystart.push(xy[l][2]);
                                targets[0].Zstart.push(xy[l][0]);
                            }

                            this.touches.push({ obj: obj, targets: targets });
                            this.highlightedObjects[obj.id] = obj;
                            obj.highlight(true);
                        }
                    }
                }

                evtTouches[i].jxg_isused = true;
            }
        }
        
        if (this.touches.length > 0) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        if (JXG.isWebkitAndroid()) {
            var ti = new Date();
            this.touchMoveLast = ti.getTime()-200;
        }

        this.options.precision.hasPoint = this.options.precision.mouse;

        this.triggerEventHandlers(['touchstart', 'down'], evt);

        return this.touches.length > 0;
    }