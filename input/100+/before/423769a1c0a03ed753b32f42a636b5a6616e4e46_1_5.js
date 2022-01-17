function(current, p0, p1)
        {

                        if(g.isResizing)
                        {
                                console.log('we are resizing the rectangle: ', g.resizeDirection)
                                console.log("mouse: ", current)
                        }
                        
                        if (g.resizeDirection == "north")
                        {
                                maxP = p0[1] > p1[1] ? p0 : p1
                                minP = p0[1] > p1[1] ? p1 : p0
                        

                                if (current[1] >= maxP[1])
                                {
                                        g.resizeDirection = "south"
                                        g.resizeRectangleEvent(current, minP, maxP)
                                }
                                else
                                {
                                        minP[1] = current[1]
                                        g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        g.drawResizeRectangles(minP, maxP)
                                }
                        }

                        if (g.resizeDirection == "south")
                        {
                                maxP = p0[1] > p1[1] ? p0 : p1
                                minP = p0[1] > p1[1] ? p1 : p0
                        
                                if (current[1] <= minP[1])
                                {
                                        g.resizeDirection = "north"
                                        g.resizeRectangleEvent(current, minP, maxP)
                                }
                                else
                                {
                                        maxP[1] = current[1]
                                        console.log("min, max",minP,maxP)
                                        g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        g.drawResizeRectangles(minP, maxP)
                                }
                        }


                        if (g.resizeDirection == "east")
                        {
                                maxP = p0[0] > p1[0] ? p0 : p1
                                minP = p0[0] > p1[0] ? p1 : p0
                                
                                if (current[0] <= minP[0])
                                {
                                        g.resizeDirection = "west"
                                        g.resizeRectangleEvent(current, minP, maxP)
                                }else
                                {
                                        maxP[0] = current[0]
                                        console.log("min, max",minP,maxP)
                                        g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        g.drawResizeRectangles(minP, maxP)
                                }
                        }

                        if (g.resizeDirection == "west")
                        {
                                maxP = p0[0] > p1[0] ? p0 : p1
                                minP = p0[0] > p1[0] ? p1 : p0
                        
                                if (current[0] >= maxP[0])
                                {
                                        g.resizeDirection = "east"
                                        g.resizeRectangleEvent(current, minP, maxP)
                                }else
                                {
                                        minP[0] = current[0]
                                        console.log("min, max",minP,maxP)
                                        g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        g.drawResizeRectangles(minP, maxP)
                                }
                        }


                        if (g.resizeDirection == "south_west")
                        {
                                g.resizeDirection = "south"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "west"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "south_west"
                        }

                        if (g.resizeDirection == "north_west")
                        {
                                g.resizeDirection = "north"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "west"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "north_west"
                        }

                        if (g.resizeDirection == "north_east")
                        {
                                g.resizeDirection = "north"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "east"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "north_east"
                        }

                        if (g.resizeDirection == "south_east")
                        {
                                g.resizeDirection = "south"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "east"
                                g.resizeRectangleEvent(current, p0, p1)
                                g.resizeDirection = "south_east"
                        }

                        d3.select("rect.view").data([1])
				.attr("x", Math.min(p0[0], p1[0]))
				.attr("y", Math.min(p0[1], p1[1]))
				.attr("width", Math.abs(p0[0]-p1[0]))
				.attr("height", Math.abs(p0[1]-p1[1]))
				.style("fill", g.fillColor)
				.style("fill-opacity", .125)
				.style("stroke", "purple")
				.style("stroke-width",2)
                        g.checkIntersect();
                        return
        }