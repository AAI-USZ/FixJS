function(p1, p2) {
		var r1, r2;
			
		r1 = p1[0] <= p2[0] ? p1 : p2;
		r2 = p1[0] <= p2[0] ? p2 : p1;
		
		return r1[1] >= r2[0] || r1[0] === r2[0];
	}