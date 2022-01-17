function(w) {
		importance[dic[w]] = 0
		rows[labels[w]].forEach(function(w2) {
		    importance[dic[w]] = importance[dic[w]] + order[dic[w2]];
		});
	    }