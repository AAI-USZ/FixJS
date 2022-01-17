function(d,i) {
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
		    }