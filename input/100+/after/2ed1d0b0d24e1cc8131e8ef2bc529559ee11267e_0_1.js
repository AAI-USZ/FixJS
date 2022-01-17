function(manager)
	    {
            // getting canvas, force, containers, cats
            manager.loadEnvironment(that);

            //createing cat in DOM
            var point = d3.svg.mouse(that.canvas.node()); // coords where comp mouse has clicked
         
            that.domNode = that.catContainer.append('use');
            that.domNode.attr('xlink:href', '#shreda')
                        .attr('x', point[0])
                        .attr('y', point[1])
                        .style('opacity','0')
                        .classed('cat', true);

            that.domNode.on('mousedown', that.events.catchCat);
            that.domNode.on('mouseover', that.events.catPreselect);

            // creating cat in force nodes
            that.forceNode = {'x': that.domNode.x.animVal.value, 'y': that.domNode.y.animVal.value};
            that.manager.addForceNode(that.forceNode);
	    }