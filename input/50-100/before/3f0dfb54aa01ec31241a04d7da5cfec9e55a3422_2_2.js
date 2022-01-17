function onPanning (touch) {
            var pos = { x: touch.screenX, y: touch.screenY },
                prev = locations[touch.identifier];
            map.panBy(pos.x - prev.x, pos.y - prev.y);
        }