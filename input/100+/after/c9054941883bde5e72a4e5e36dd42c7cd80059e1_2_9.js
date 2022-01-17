function(now, fx) {
                var dx = 0;
                var dy = 0;
                if (fx.prop === "x") {
                    dx = now - graph.scalePoint(pro.centerPoint.coord)[0];
                } else if (fx.prop === "y") {
                    dy = now - graph.scalePoint(pro.centerPoint.coord)[1];
                }
                $.each(pro.set.items, function() {
                    this.translate(dx, dy);
                });
                pro.centerPoint.setCoord([pro.centerPoint.coord[0] + dx / graph.scale[0], pro.centerPoint.coord[1] - dy / graph.scale[1]]);
                pro.rotateHandle.setCoord([pro.rotateHandle.coord[0] + dx / graph.scale[0], pro.rotateHandle.coord[1] - dy / graph.scale[1]]);
            }