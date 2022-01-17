function(d){
					if (g.moveLasso)
					{
						//console.log("should move the shapes!!!");
						var coord = d3.mouse(this);
						var dx = coord[0]-g.prevMovePoint[0];
						var dy = coord[1]-g.prevMovePoint[1];
						//console.log("moving mouse over: ",dx, ' ',dy)
						
						for (var i=0; i<d.length; i++)
						{
							d[i][0] = d[i][0]+dx;
							d[i][1] = d[i][0]+dy;
						}
						
						var strPointList = "";
						for (var i=0; i<g.pointList.length; i++)
						{
							g.pointList[i][0] = g.pointList[i][0]+dx;
							g.pointList[i][1] = g.pointList[i][1]+dy;
							var p = g.pointList[i]
							strPointList += p[0]+','+p[1]+' '
						}
		
						if (g.isLasso())
						{
							
							d3.select("polygon.brush").data(g.pointList)
								.attr("points", strPointList)
								.attr("style","fill:"+g.fillColor+";stroke:purple;stroke-width:2;fill-rule:evenodd;fill-opacity:.125")
						}else{
							var p0 = g.pointList[0]
							var p1 = g.pointList[g.pointList.length-1]

							d3.select("rect.view").data([1])
								.attr("x", Math.min(p0[0], p1[0]))
								.attr("y", Math.min(p0[1], p1[1]))
								.attr("width", Math.abs(p0[0]-p1[0]))
								.attr("height", Math.abs(p0[1]-p1[1]))
								.style("fill", g.fillColor)
								.style("fill-opacity", .125)
								.style("stroke", "purple")
								.style("stroke-width",2)

                                                        g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                                        g.drawResizeRectangles(p0,p1);
								

						}
						//d3.select(this).attr("transform", function() { return "translate(" + dx + "," + dy + ")"; })
						g.checkIntersect();
						var p = d3.mouse(this);
						g.prevMovePoint = [p[0], p[1]];
					}
				}