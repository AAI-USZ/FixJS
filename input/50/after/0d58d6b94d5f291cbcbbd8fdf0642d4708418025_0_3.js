function(d) {
			var rw = this.getBBox().width;
			d3.select('#chart').selectAll('#'+getidname('w_'+d.name+'_bg_chart'))
			    .attr('width',rw+10)
		    }