function() {
                                
                                //registerKeyboardHandler(this.keyDown());
                               
                                //console.log("the scale", d3.event);
                                //console.log(d3.event.sourceEvent.shiftKey)
                                
                                if (!move_mode)
                                {
                                         return;
                                }

                                nodeDatum = svg_substrate.selectAll("g.node").data()
                                console.log("the data", nodeDatum)
                                nodeDatum.forEach(function(d){d.currentX = (d.x*Math.pow(d3.event.scale,2)+d3.event.translate[0]*(1+d3.event.scale));
                                                              d.currentY = (d.y*Math.pow(d3.event.scale,2)+d3.event.translate[1]*(1+d3.event.scale));
                                                                });
                                //svg_substrate.selectAll("g.node").data(nodeDatum)

                                /*
                                svg_substrate.selectAll("circle.test").data([]).exit().remove();

                                svg_substrate.selectAll("circle.test").data(nodeDatum).enter().append("svg:circle")
                                        .attr("class","test")
                                        .attr("cx", function(d){console.log('currentX ',d.currentX); return d.currentX})
                                        .attr("cy", function(d){ return d.currentY})
                                        .attr("r", 4)
                                        .style('fill', 'red')
                                        .style('fill-opacity', 1)

                                console.log( svg_substrate.selectAll("circle.test"))
                                */

                                svg_substrate.selectAll(".node,.link").attr("transform","translate(" + d3.event.translate[0] + "," +  d3.event.translate[1] + ") scale(" +  d3.event.scale + ")")
 //                               svg_substrate.selectAll("text.node").style("font-size", function(){ console.log(12.0/d3.event.scale); return Math.round(12.0/d3.event.scale);});
                                //svg_substrate.selectAll(".node,.link").attr("transform","scale(" +  d3.event.scale + ")");
                                svg_substrate.selectAll("text.node").style("font-size", function(){ return Math.ceil(12/(d3.event.scale*d3.event.scale));});
                            }