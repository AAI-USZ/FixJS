function(dateString) {
        if (typeof dateString != 'undefined') {
            dateString = dateString.replace('T', ' ');
            dateString = dateString.replace('Z', '');
            var d = Date.parse(dateString);
            return d; 
        }
	}