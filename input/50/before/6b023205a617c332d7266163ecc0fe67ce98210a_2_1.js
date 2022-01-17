function(d){
					//if (this.canMove) return;
					var p = d3.mouse(this);
					__g.prevMovePoint = [p[0], p[1]];
					__g.moveLasso = true;
                                        console.log("svg to move:", svg)
				}