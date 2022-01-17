function(){

		force.nodes([]).links([]);
		force
		    .nodes(nodes)
		    .links(links)
		    .start();

		//console.log(words.length,nodes.length,links.length)
		var svg;
		d3.select("#chart").selectAll('svg').remove()
		svg = d3.select("#chart").append("svg")
		    .attr("width", width)
		    .attr("height", height);
		

		var labels = svg.selectAll('text.label')
		    .data(nodes).enter();

		var g = labels
		    .append('g')
		    .attr('class','label')
		    .attr('id',function(d) {
			return 'w_'+d.name+'_chart'
		    })
		    .style('opacity',0);

		g
		    .append('rect')
		    .attr('id',function(d) { return 'w_'+d.name+'_bg_chart'})
		    .attr('height',tw*1.5)
		    .style('fill','rgb(240,240,240)')
		    .style('border','solid')
		    .style('border-color','lightgray')
		    .style('border-width','1px')		
		    .attr('rx',3)
		    .attr('ry',3)
		    .attr('x',-5)
		    .attr('y',-tw*1.5+5);

		g
		    .append('text')
		    .text(function(d) {
			return d.name
		    })
		    .each(function(d) {
			var rw = this.getBBox().width;
			d3.select('#chart').selectAll('#w_'+d.name+'_bg_chart')
			    .attr('width',rw+10)
		    });


		var link = svg.selectAll("line.link")
		    .data(links);
		link
		    .enter().append("line")
		    .attr("class", "link")
		    .style("stroke-width", function(d) { return Math.sqrt(d.value); })
		    .style('opacity',linkopacity);
		
		var node = svg.selectAll("circle.node")
		    .data(nodes);
		node
		    .enter().append("circle")
		    .attr("class", "node")
		    .attr('id',function(d) {return node.name})
		    .attr("r", noderadius)
		    .style("fill", function(d) { return color(d.group); })
		    .on('click',function(d) {
			plotall(d.name)
		    })
		    .on('mousemove',function(d,i) {
			var id = '#w_'+d.name+'_chart'
			var el = d3.select(id);
			el
			    .attr('transform',function(d,i) {
				return 'translate('+(d.x+10)+','+(d.y - 0)+')';
			    })
			    .style('opacity',0.8);
			// move the 'g' element to end (first in z-order)
			d3.select('#chart').select('svg')[0][0]
			    .appendChild(el[0][0])
		    })
		    .on('mouseout',function(d,i) {
			var id = '#w_'+d.name+'_chart'
			var el = d3.select(id);
			var svg = d3.select('#chart').select('svg')[0][0]
			el.style('opacity',0);
			// move the element to top (last in z-order)
			svg.insertBefore(el[0][0],svg.firstChild)
		    })
		    .call(force.drag);
		
		force.on("tick", function() {
		    link.attr("x1", function(d) { return d.source.x; })
		    	.attr("y1", function(d) { return d.source.y; })
		    	.attr("x2", function(d) { return d.target.x; })
		    	.attr("y2", function(d) { return d.target.y; });
		    
		    node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
		});
	    }