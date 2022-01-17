function(d){
                                        //console.log('current obj', d)
					var x = d.currentX;
					var y = d.currentY;
					var pointArray = []
					if (__g.isLasso())
					{
						pointArray = __g.pointList
					}else{
						var p0 = __g.pointList[0]
						var p1 = __g.pointList[__g.pointList.length-1]			
						pointArray = [[p0[0], p0[1]],[p0[0], p1[1]], [p1[0], p1[1]], [p1[0], p0[1]]]
					}
                                        //console.log("before")
                                        

                                        if (e.ctrlKey && d.selected == true)
                                                return true;

                                        var intersects = __g.intersect(pointArray, x, y)
                                        //console.log('result of intersects? ',intersects,pointArray,x,y)

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
                                                //console.log ("d.selected = ",intersects);
        					d.selected = intersects;
                                        }

					return d.selected

				}