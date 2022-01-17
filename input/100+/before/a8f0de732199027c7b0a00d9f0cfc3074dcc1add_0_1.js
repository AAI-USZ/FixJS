function onGestureStart(e) {
        if (Object.getOwnPropertyNames(myGestures).length == 0) {
            document.body.addEventListener("touchend", onGestureEnd, false);
            document.body.addEventListener("touchmove", onGesture, false);
        }
        for (var i = 0; i < e.changedTouches.length; i++) {
            void function (touch) {
                var touchRecord = new Object();
                for (var p in touch)
                    touchRecord[p] = touch[p];
                var gesture = {
                    startTouch: touchRecord,
                    startTime: Date.now(),
                    status: "tapping",
                    pressingHandler: setTimeout(function () {
                        if (gesture.status == "tapping") {
                            gesture.status = "pressing";
                            var ev = document.createEvent('HTMLEvents');
                            ev.initEvent('press', true, true);
                            gestureEventProperties.forEach(function (p) {
                                ev[p] = touchRecord[p];
                            })
                            ele.dispatchEvent(ev);
                        }

                        gesture.pressingHandler = null;
                    }, 500)
                };
                myGestures[touch.identifier] = gesture;
            } (e.changedTouches[i]);
        }
        if (Object.getOwnPropertyNames(myGestures).length == 2) {
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent('dualtouchstart', true, true);
            ele.dispatchEvent(ev);
            ev.touches = JSON.parse(JSON.stringify(e.touches));
            dualtouchstart = true;
        }
    }