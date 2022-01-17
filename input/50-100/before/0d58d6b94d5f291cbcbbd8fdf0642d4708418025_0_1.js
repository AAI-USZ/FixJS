function(d,i) {
			var id = '#w_'+d.name+'_chart'
			var el = d3.select(id);
			var svg = d3.select('#chart').select('svg')[0][0]
			el.style('opacity',0);
			// move the element to top (last in z-order)
			svg.insertBefore(el[0][0],svg.firstChild)
		    }