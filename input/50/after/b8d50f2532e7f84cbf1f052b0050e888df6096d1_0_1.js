function(jXHR, textStatus, errorThrown) {
		if(textStatus !== 'abort'){
		    alert('Could not load feed. Is reddit down?');
		}
	    }