function(d){
                                        //console.log('g object:',this)
					if (__g.moveLasso)
					{
						//console.log("should move the shapes!!!");
						var coord = d3.mouse(this);
						var dx = coord[0]-__g.prevMovePoint[0];
						var dy = coord[1]-__g.prevMovePoint[1];
						//console.log("moving mouse over: ",dx, ' ',dy)
						
						for (var i=0; i<d.length; i++)
						{
							d[i][0] = d[i][0]+dx;
							d[i][1] = d[i][0]+dy;
						}
						
						var strPointList = "";
                                                //console.log('g:', this);
                                                //console.log('the pointList:', this.pointList)
						for (var i=0; i<__g.pointList.length; i++)
						{
							__g.pointList[i][0] = __g.pointList[i][0]+dx;
							__g.pointList[i][1] = __g.pointList[i][1]+dy;
							var p = __g.pointList[i]
							strPointList += p[0]+','+p[1]+' '
						}
		
						if (__g.isLasso())
						{
							
							__g.cSvg.select("polygon.brush").data(__g.pointList)
								.attr("points", strPointList)
								.attr("style","fill:"+__g.fillColor+";stroke:purple;stroke-width:2;fill-rule:evenodd;fill-opacity:.125")
						}else{
							var p0 = __g.pointList[0]
							var p1 = __g.pointList[__g.pointList.length-1]

							__g.cSvg.select("rect.view").data([1])
								.attr("x", Math.min(p0[0], p1[0]))
								.attr("y", Math.min(p0[1], p1[1]))
								.attr("width", Math.abs(p0[0]-p1[0]))
								.attr("height", Math.abs(p0[1]-p1[1]))
								.style("fill", this.fillColor)
								.style("fill-opacity", .125)
								.style("stroke", "purple")
								.style("stroke-width",2)

                                                        __g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                                        __g.drawResizeRectangles(p0,p1);
								

						}
						//d3.select(this).attr("transform", function() { return "translate(" + dx + "," + dy + ")"; })
						__g.checkIntersect();
						var p = d3.mouse(this);
						__g.prevMovePoint = [p[0], p[1]];
					}
				}