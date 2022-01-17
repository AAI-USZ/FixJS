function(e) {
		if (e.success)
			refresh();
		else
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	}