function(j, p2) {
            ps.push(points[(i+j) % points.length][sweeps[(j+1) % sweeps.length] == inner ? 0 : 1]);
            cs.push(circles[(i+j+1) % circles.length]);
        }