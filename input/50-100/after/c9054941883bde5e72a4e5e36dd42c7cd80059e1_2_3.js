function(x, y) {
            var angle = Math.atan2(pro.centerPoint.coord[1] - y, pro.centerPoint.coord[0] - x) * 180 / Math.PI;
            pro.rotate(-angle - 5, true);
        }