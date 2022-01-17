function()
		{
			var __g = this
			var selList = []
                        var e=window.event
                        //console.log('control pushed ', e.ctrlKey)
                        //console.log("svg operating the selection", svg)
			svg.selectAll("g.node").classed("selected", function(d){
                                        console.log('current obj', d)
                                        var x = 0;
                                        var y = 0;
                                        if (!('currentX' in d))
                                        {
                                                x = d.x;
                                                y = d.y;
                                        } else
                                        { 
					        x = d.currentX;
					        y = d.currentY;
                                        }
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
                                        if (intersects) console.log("node intersects", d)
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
                                        console.log("returning selection:",d.selected)
					return d.selected

				})
				.select("circle.node").style('fill', function(d){
					if (e.ctrlKey && d.selected == true)
                                        {
                                                selList.push(d.baseID)
                                                return 'red';
                                        }
					if (d.selected){
						selList.push(d.baseID)
						return 'red';
					}else
						return 'steelblue';
				});

			
			selList.sort()
                        console.log("secltion list: ",selList)
                        
			if(selList.length>0)// && target == "substrate")
			{	
				if(selList.length == prevSelList.length)
				{
					var i = 0;
					var iMax = selList.length;
					while(i<iMax && selList[i] == prevSelList[i])
						i++;
					if (i != iMax)
					{
						prevSelList.length = 0
						prevSelList = selList.slice(0);
						syncGraph(getSelection(target), target)
					}
				}else{
					
						prevSelList.length = 0
						prevSelList = selList.slice(0);
						syncGraph(getSelection(target), target)
				}
			}

		}