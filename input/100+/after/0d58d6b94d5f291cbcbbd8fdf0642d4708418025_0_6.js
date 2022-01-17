function(htxt) {
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
	}