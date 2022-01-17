function onPanning(touch) {
            lastMove = +new Date();
            oldPoint = nowPoint;
            nowPoint = { x: touch.clientX, y: touch.clientY };
        }