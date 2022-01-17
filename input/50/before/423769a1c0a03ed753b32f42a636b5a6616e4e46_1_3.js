function(d){
					//if (g.canMove) return;
					var p = d3.mouse(this);
					g.prevMovePoint = [p[0], p[1]];
					g.moveLasso = true;
				}