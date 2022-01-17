function(canvas, area, g) {
                canvas.fillStyle = "rgba(105, 105, 185, 185)";
                //Draw simplification points
                colnum = myData[i].colnum;

                for(var k = 0; k < simplificationPoints[colnum].length-1; k++) {
                    var bottom_left = g.toDomCoords(simplificationPoints[colnum][k], -20);
                    var left = bottom_left[0];
                    canvas.fillRect(left, area.y, 2, area.h);
                }
            }