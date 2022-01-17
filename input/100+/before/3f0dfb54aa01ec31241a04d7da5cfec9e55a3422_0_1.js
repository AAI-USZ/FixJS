function updateTouches(e) {
            for (var i = 0; i < e.touches.length; i += 1) {
                var t = e.touches[i];
                if (t.identifier in locations) {
                    var l = locations[t.identifier];
                    l.x = t.screenX;
                    l.y = t.screenY;
                    l.scale = e.scale;
                }
                else {
                    locations[t.identifier] = {
                        scale: e.scale,
                        startPos: { x: t.screenX, y: t.screenY },
                        x: t.screenX,
                        y: t.screenY,
                        time: new Date().getTime()
                    };
                }
            }
        }