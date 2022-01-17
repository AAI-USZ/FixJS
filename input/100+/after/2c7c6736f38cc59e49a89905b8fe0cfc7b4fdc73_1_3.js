function(d){					
					if (__g.moveLasso)
					{
						var coord = d3.mouse(this);
						var dx = coord[0]-__g.prevMovePoint[0];
						var dy = coord[1]-__g.prevMovePoint[1];
						
						for (var i=0; i<d.length; i++)
						{
							d[i][0] += dx;
							d[i][1] += dy;
						}
						
						var strPointList = "";
						for (var i=0; i<__g.pointList.length; i++)
						{
							__g.pointList[i][0] += dx;
							__g.pointList[i][1] += dy;
							var p = __g.pointList[i]
							strPointList += p[0]+','+p[1]+' '
						}
						__g.cSvg.select("polygon.brush").data(__g.pointList)
							.attr("points", strPointList)
						//d3.select(this).attr("transform", function(d) { return "translate(" + dx + "," + dy + ")"; })
						//this.prevMovePoint = []
					}
					__g.moveLasso = false;
					//this.canMove = false;
					
				}