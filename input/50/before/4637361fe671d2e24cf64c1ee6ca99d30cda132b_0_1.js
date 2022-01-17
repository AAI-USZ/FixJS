function onPanning(touch) {
            lastMove = +new Date();
            oldPoint = nowPoint;
            nowPoint = { x: touch.screenX, y: touch.screenY };
            // oldPoint = locations[touch.identifier];
        }