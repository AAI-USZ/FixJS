function(x, y) {
            var angle = Math.atan2(pro.center[1] - y, pro.center[0] - x) * 180 / Math.PI;
            pro.rotate(-angle - 5);
        }