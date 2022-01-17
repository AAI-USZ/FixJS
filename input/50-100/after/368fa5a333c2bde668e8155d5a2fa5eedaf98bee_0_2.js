function(j, p2) {
            ps.push(points[(i+j) % points.length][inOrOut[(j+1) % inOrOut.length]]);
            cs.push(circles[(i+j+1) % circles.length]);
        }