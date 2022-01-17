function(d) {
	    var newnoderadius = parseFloat(d3.event.srcElement.value);
	    d3.select('#chart').selectAll('circle.node')
		.attr('r',function(d) {
		    var curradius = parseFloat(this.getAttribute('r'));
		    var delta = newnoderadius - noderadius;
		    console.log(curradius,newnoderadius, noderadius,curradius + delta)
		    return curradius + delta
		});
	    noderadius = newnoderadius;
	}