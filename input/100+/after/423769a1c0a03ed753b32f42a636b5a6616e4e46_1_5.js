function(current, p0, p1)
        {

                        if(__g.isResizing)
                        {
                                console.log('we are resizing the rectangle: ', this.resizeDirection)
                                console.log("mouse: ", current)
                        }
                        
                        if (__g.resizeDirection == "north")
                        {
                                maxP = p0[1] > p1[1] ? p0 : p1
                                minP = p0[1] > p1[1] ? p1 : p0
                        

                                if (current[1] >= maxP[1])
                                {
                                        __g.resizeDirection = "south"
                                        __g.resizeRectangleEvent(current, minP, maxP)
                                }
                                else
                                {
                                        minP[1] = current[1]
                                        __g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        __g.drawResizeRectangles(minP, maxP)
                                }
                        }

                        if (__g.resizeDirection == "south")
                        {
                                maxP = p0[1] > p1[1] ? p0 : p1
                                minP = p0[1] > p1[1] ? p1 : p0
                        
                                if (current[1] <= minP[1])
                                {
                                        __g.resizeDirection = "north"
                                        __g.resizeRectangleEvent(current, minP, maxP)
                                }
                                else
                                {
                                        maxP[1] = current[1]
                                        //console.log("min, max",minP,maxP)
                                        __g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        __g.drawResizeRectangles(minP, maxP)
                                }
                        }


                        if (__g.resizeDirection == "east")
                        {
                                maxP = p0[0] > p1[0] ? p0 : p1
                                minP = p0[0] > p1[0] ? p1 : p0
                                
                                if (current[0] <= minP[0])
                                {
                                        __g.resizeDirection = "west"
                                        __g.resizeRectangleEvent(current, minP, maxP)
                                }else
                                {
                                        maxP[0] = current[0]
                                        //console.log("min, max",minP,maxP)
                                        __g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        __g.drawResizeRectangles(minP, maxP)
                                }
                        }

                        if (__g.resizeDirection == "west")
                        {
                                maxP = p0[0] > p1[0] ? p0 : p1
                                minP = p0[0] > p1[0] ? p1 : p0
                        
                                if (current[0] >= maxP[0])
                                {
                                        __g.resizeDirection = "east"
                                        __g.resizeRectangleEvent(current, minP, maxP)
                                }else
                                {
                                        minP[0] = current[0]
                                        //console.log("min, max",minP,maxP)
                                        __g.cSvg.selectAll("g.resize").data([]).exit().remove()
                                        __g.drawResizeRectangles(minP, maxP)
                                }
                        }


                        if (__g.resizeDirection == "south_west")
                        {
                                __g.resizeDirection = "south"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "west"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "south_west"
                        }

                        if (__g.resizeDirection == "north_west")
                        {
                                __g.resizeDirection = "north"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "west"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "north_west"
                        }

                        if (__g.resizeDirection == "north_east")
                        {
                                __g.resizeDirection = "north"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "east"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "north_east"
                        }

                        if (__g.resizeDirection == "south_east")
                        {
                                __g.resizeDirection = "south"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "east"
                                __g.resizeRectangleEvent(current, p0, p1)
                                __g.resizeDirection = "south_east"
                        }

                        __g.cSvg.select("rect.view").data([1])
				.attr("x", Math.min(p0[0], p1[0]))
				.attr("y", Math.min(p0[1], p1[1]))
				.attr("width", Math.abs(p0[0]-p1[0]))
				.attr("height", Math.abs(p0[1]-p1[1]))
				.style("fill", this.fillColor)
				.style("fill-opacity", .125)
				.style("stroke", "purple")
				.style("stroke-width",2)
                        __g.checkIntersect();
                        return
        }