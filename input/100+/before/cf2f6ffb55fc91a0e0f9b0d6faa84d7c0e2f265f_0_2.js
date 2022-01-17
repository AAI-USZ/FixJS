function onGestureEnd(e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var gesture = myGestures[e.changedTouches[i].identifier];
            var touch = e.changedTouches[i];
            if (!gesture)
                continue;

            if (gesture.pressingHandler) {
                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            }
            if (gesture.status == "tapping") {
                var ev = document.createEvent('HTMLEvents');
                ev.initEvent('tap', true, true);
                gestureEventProperties.forEach(function (p) {
                    ev[p] = touch[p];
                });
                ele.dispatchEvent(ev);
            }
            if (gesture.status == "panning") {
                var ev = document.createEvent('HTMLEvents');
                ev.initEvent('panend', true, true);
                gestureEventProperties.forEach(function (p) {
                    ev[p] = touch[p];
                });
                ele.dispatchEvent(ev);
                
                var duration = Date.now() - gesture.startTime;
                
                if (duration < 300) {
                    var ev = document.createEvent('HTMLEvents');
                    ev.initEvent('flick', true, true);
                    
                    ev.duration = duration;
                    ev.valocityX = (touch.clientX - gesture.startTouch.clientX )/duration;
                    ev.valocityY = (touch.clientY - gesture.startTouch.clientY )/duration;
                    ev.displacementX = touch.clientX - gesture.startTouch.clientX;
                    ev.displacementY = touch.clientY - gesture.startTouch.clientY;
                    
                    gestureEventProperties.forEach(function (p) {
                        ev[p] = touch[p];
                    });
                    ele.dispatchEvent(ev);
                }
            }
            if (gesture.status == "pressing") {
                var ev = document.createEvent('HTMLEvents');
                ev.initEvent('pressend', true, true);
                gestureEventProperties.forEach(function (p) {
                    ev[p] = touch[p];
                });
                ele.dispatchEvent(ev);
            }
            delete myGestures[e.changedTouches[i].identifier];
        }
        if (Object.getOwnPropertyNames(myGestures).length == 0) {
            document.body.removeEventListener("touchend", onGestureEnd, false);
            document.body.removeEventListener("touchmove", onGesture, false);
        }
    }