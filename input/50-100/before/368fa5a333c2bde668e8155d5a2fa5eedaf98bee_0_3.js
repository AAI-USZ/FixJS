function(i, p) {
            drawIntersection(points, circles, labels[(i+2) % points.length],  i, [true,false,true], true, true);
            drawIntersection(points, circles, labels[3 + i],  i, [true,false,true], false);

        }