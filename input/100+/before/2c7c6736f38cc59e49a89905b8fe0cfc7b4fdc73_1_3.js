function(d){					
					if (g.moveLasso)
					{
						var coord = d3.mouse(this);
						var dx = coord[0]-g.prevMovePoint[0];
						var dy = coord[1]-g.prevMovePoint[1];
						
						for (var i=0; i<d.length; i++)
						{
							d[i][0] += dx;
							d[i][1] += dy;
						}
						
						var strPointList = "";
						for (var i=0; i<g.pointList.length; i++)
						{
							g.pointList[i][0] += dx;
							g.pointList[i][1] += dy;
							var p = g.pointList[i]
							strPointList += p[0]+','+p[1]+' '
						}
						d3.select("polygon.brush").data(g.pointList)
							.attr("points", strPointList)
						//d3.select(this).attr("transform", function(d) { return "translate(" + dx + "," + dy + ")"; })
						//g.prevMovePoint = []
					}
					g.moveLasso = false;
					//g.canMove = false;
					
				}