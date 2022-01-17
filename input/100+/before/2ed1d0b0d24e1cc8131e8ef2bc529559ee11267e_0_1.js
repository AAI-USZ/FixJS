function(manager)
	    {
            that.manager = manager; 
            // getting canvas, force, containers, cats
            manager.loadEnvironment(that);

            //createing cat in DOM
            that.domNode = that.catContainer.append('use');
            that.domNode.attr('xlink:href', '#shreda')
                        .attr('x', function(d, i){return i*200})
                        .attr('y', 0)
                        .style('opacity','0')
                        .classed('cat', true);

            that.domNode.on('mousedown', that.events.catchCat);
            that.domNode.on('mouseover', that.events.catPreselect);

            // creating cat in force nodes
            that.forceNode = {'x': that.domNode.x.animVal.value, 'y':that.domNode.y.animVal.value};
            that.forceNodes.push(that.forceNode);
//            that.manager.addNewCat(that);
	    }