function(d){
					var x = d.currentX;
					var y = d.currentY;
					var pointArray = []
					if (g.isLasso())
					{
						pointArray = g.pointList
					}else{
						var p0 = g.pointList[0]
						var p1 = g.pointList[g.pointList.length-1]			
						pointArray = [[p0[0], p0[1]],[p0[0], p1[1]], [p1[0], p1[1]], [p1[0], p0[1]]]
					}
                                        console.log("before")
                                        

                                        if (e.ctrlKey && d.selected == true)
                                                return true;

                                        var intersects = g.intersect(pointArray, x, y)

                                        if (e.shiftKey && intersects)
                                        {
                                                console.log("shift pressed and intersects so return false");
                                                d.selected = false;
                                        }
                                        else if (e.shiftKey && !intersects && d.selected == true)
                                        {
                                                console.log("shift pressed and doesnt intersects and true so return true");
                                                d.selected = true;
                                        }else
                                        {    
                                                console.log ("d.selected = ",intersects);
        					d.selected = intersects;
                                        }

					return d.selected

				}