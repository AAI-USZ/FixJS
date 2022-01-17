function(now, fx) {
                        if (fx.prop === "x") {
                            movablePoint.coord[0] = now;
                        } else {
                            movablePoint.coord[1] = now;
                        }
                        movablePoint.setCoord(movablePoint.coord);
                    }