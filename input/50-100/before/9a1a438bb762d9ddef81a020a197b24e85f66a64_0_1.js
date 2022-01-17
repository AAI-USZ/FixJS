function changeAccessibility(x, y, state) {
		if(!state) {
		    $('#cell_'+x+'_'+y).css('opacity', 0.3);			
		} else {
		    $('#cell_'+x+'_'+y).css('opacity', 1);						
		}
	}