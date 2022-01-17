function(imports) {

	rows = d3.csv.parseRows(imports,function(row,i) {
	    labels[row[0]] = i;
	    return row;
	});
	d3.select('#qdiv').selectAll('input').attr('disabled',null);
	stat.clear();

	/*
	 * these are our shared variables to store the data
	 */
	var words = [];
	var links = [];
	var nodes = [];
	var dic = {};
	var order = [];
	var importance = [];
	var gcntr = 0;
	var cntr = 0;
	
	var getlinks = function(newwords) {
	    //links = [];
	    //nodes = [];
	    //var dic = {};
	    // create the dictionary of all words
	    // that originate from given words
	    // and create links
	    var ii = 1;
	    newwords.forEach(function(w1) {
		// the first element is rows is the same as 
		rows[labels[w1]].forEach(function(w2) {
		    if (dic[w2] == null) {
			dic[w2] = cntr;
			order[dic[w2]] = 0;
			nodes.push({name: w2, index:labels[w2], group:gcntr, idic:cntr});
			//console.log(cntr,w1,w2,dic[w1],dic[w2])
			cntr++;
		    }
		    if (w1 != w2) {
			var tt = {source: dic[w1], target: dic[w2]};
			//console.log(ii++,w1,w2,labels[w1],labels[w2],dic[w1],dic[w2],tt);
			links.push(tt);
			order[dic[w2]] = order[dic[w2]] + 1;
		    }
		});
		gcntr++;
	    });
	    info.report('You are viewing '+words.length+' words and '+nodes.length+' nodes.');
	    words.forEach(function(w) {
		importance[dic[w]] = 0
		rows[labels[w]].forEach(function(w2) {
		    importance[dic[w]] = importance[dic[w]] + order[dic[w2]];
		});
	    });
	};

	var plot = function() {
	    //force.
	    var draw = function(){

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
			return getidname('w_'+d.name+'_chart')
		    })
		    .style('opacity',0);

		g
		    .append('rect')
		    .attr('id',function(d) { return getidname('w_'+d.name+'_bg_chart')})
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
			d3.select('#chart').selectAll('#'+getidname('w_'+d.name+'_bg_chart'))
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
		    .attr("r", function(d) {
			var i = (importance[dic[d.name]] == null ? 0 : importance[dic[d.name]]);
			//console.log(d.name,i)
			//console.log(d.name,importance[dic[d.name]],Math.min(100,importance[dic[d.name]])/100*noderadius*2)
			return noderadius + Math.min(200,i)/200*noderadius*2;
		    })
		    .style("fill", function(d) { return color(d.group); })
		    .on('click',function(d) {
			plotall(d.name)
		    })
		    .on('mousemove',function(d,i) {
			var id = '#'+getidname('w_'+d.name+'_chart')
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
			var id = '#'+getidname('w_'+d.name+'_chart')
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

		    stat.report('simulation running...');
		    stat.clear();
		});
	    };

	    draw();

	};
	var addcolumn = function(input) {
	    var neighbors=rows[labels[input]];
	    d3.select("#wordcol").selectAll('svg').remove()

	    var box=d3.select("#wordcol").append("svg")

	    box.attr("width", wwidth)
		.attr("height", wheight)
		.attr('id',input+'_box')
		.style('display','inline');
	    var elems=box.append("g")
		.attr("transform", "translate(0,40)")
		.attr("id","textbox")
		.on('click', function(d,i) {
		    var mouse = d3.mouse(this)
		    var x = mouse[0]
		    var y = mouse[1]+10
		    var ix = Math.floor(Math.max(0,y)/tw)
		    var iy = Math.floor(Math.max(0,x)/wwidth)
		    var texts = d3.select(this).selectAll('text')
		    d3.select('#query').property('value',texts[iy][ix].textContent)
		    plotall(texts[iy][ix].textContent)
		})
		.on('mousemove',function(d,i) {
		    var mouse = d3.mouse(this)
		    var x = mouse[0]
		    var y = mouse[1]+10
		    var ix = Math.floor(Math.max(0,y)/tw)
		    var iy = Math.floor(Math.max(0,x)/wwidth)
		    var texts = d3.select(this).selectAll('text')
		    highlight(texts[iy][ix].textContent)
		})
		.selectAll("text")
		.data(neighbors)
		.enter()
	    elems.append("rect")
		.style("opacity", 0.0)
		.attr("text-anchor", "left")
		.attr('id',function(d) { return getidname("w_"+d+"_bg"); })
		.style("fill","lightblue")
		.attr("x",0)
		.attr("y",function(d,i){return (i-1)*tw})
		.attr("rx",5)
		.attr("ry",5)
		.attr("width",wwidth-10)
		.attr("height",20);
	    elems.append("text")
		.style("opacity", function(d,i) {return (1-i/neighbors.length/1.3);})
		.attr("text-anchor", "left")
		.attr('id',function(d) { return getidname("w_"+d); })
		.attr("transform", function(d,i) {
		    return "translate(" + [3, i*tw] + ")rotate(" + 0 + ")";
		})
		.text(function(d) { return d; })
	};
	var highlight = function(htxt) {
	    // clear previous stuff
	    d3.selectAll('#textbox').selectAll('text')
		.style('font-weight','normal');

	    /*
	    d3.selectAll('#chart').selectAll('text')
		.style('font-weight','normal');
	    */

	    d3.selectAll('#textbox').selectAll('rect')
		.style('opacity',0);
	    
	    /*
	    d3.selectAll('#chart').selectAll('g.label')
		.style('opacity',0);
	    */

	    if (labels[htxt] == null || htxt == null || !htxt) {
		return
	    }

	    d3.selectAll('#'+getidname('w_'+htxt+"_bg"))
		.style('opacity',0.8);

	    /*
	    d3.selectAll('#w_'+htxt+"_chart")
		.style('opacity',0.8);
	    */

	    d3.selectAll('#'+getidname('w_'+htxt))
		.style('font-weight','bold');
	};
	/*
	 * add a new data point to the system
	 * checks if the target word is in dictionary
	 */
	var addata = function(input) {
	    if (labels[input] == null) {
		stat.show(input + " is not in dictionary")
		return;
	    }
	    words.push(input);
	    getlinks([input]);
	    //console.log(nodes.length,links.length,nodes,links)
	};
	var plotall = function(input) {
	    // check if this word is already in the graph
	    var wused = false;
	    words.forEach(function(w) {
		if (w == input) {
		    wused = true;
		}
	    });
	    if (labels[input] == null) {
		stat.show(input + " is not in dictionary")
		return;
	    }
	    if (!wused) {
		// add the word as new data point
		addata(input);
		// update the chord diagram
		plot()
	    }
	    // refresh the text column
	    addcolumn(input);
	};
	/*
	 *  query box handler.
	 *  checks if the target word is already in the graph
	 */
	d3.select('#query').on("keyup", function(d,i) {
	    // only do something if user pressed enter key
	    if (d3.event.keyCode != 13){
		return;
	    }
	    var input=d3.event.srcElement.value;
	    plotall(input)
	    // highlight the text so that user can keep 
	    // typing without need to delete the current word
	    d3.event.srcElement.select();
	});

	d3.select('#showlinks').on('change', function(d) {
	    var checked = d3.event.srcElement.checked;
	    if (checked) {
		linkopacity = 0.8;
	    } else {
		linkopacity = 0.0;
	    }
	    d3.select("#chart").selectAll('line.link').style('opacity',linkopacity);
	});
	d3.select('#noderadius').on('change', function(d) {
	    var newnoderadius = parseFloat(d3.event.srcElement.value);
	    d3.select('#chart').selectAll('circle.node')
		.attr('r',function(d) {
		    var curradius = parseFloat(this.getAttribute('r'));
		    var delta = newnoderadius - noderadius;
		    console.log(curradius,newnoderadius, noderadius,curradius + delta)
		    return curradius + delta
		});
	    noderadius = newnoderadius;
	});
	d3.select('#charge').on('change', function(d) {
	    charge = d3.event.srcElement.value;
	    force.charge(charge).start();
	});
	d3.select('#distance').on('change', function(d) {
	    distance = d3.event.srcElement.value;
	    force.linkDistance(distance).start();
	});
	d3.select('#gravity').on('change', function(d) {
	    gravity = d3.event.srcElement.value;
	    force.gravity(gravity).start();
	});

	/*
	 *  clear the page
	 */
	d3.select('#clear').on("click",function(d) {
	    d3.select('#query').property('value','')
	    d3.select("#chart").selectAll('svg')
		.transition()
		.duration(ttime)
		.style('opacity',0)
		.remove();
	    d3.select('#wordcol').selectAll('svg')
		.transition()
		.duration(ttime)
		.style('opacity',0)
		.remove();
	    words = [];
	    links = [];
	    nodes = [];
	    order = [];
	    importance = [];
	    dic = {};
	    gcntr = 0;
	    cntr = 0;
	    info.report('You are viewing 0 words and 0 nodes.');
	});


    }