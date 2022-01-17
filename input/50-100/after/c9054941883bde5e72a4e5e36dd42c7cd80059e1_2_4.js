function(now, fx) {
                pro.rotate(now, true);
                pro.rotateHandle.setCoord([
                    Math.sin((now + 275) * Math.PI / 180) * (r + 0.5) + pro.centerPoint.coord[0],
                    Math.cos((now + 275) * Math.PI / 180) * (r + 0.5) + pro.centerPoint.coord[1]
                ]);
            }