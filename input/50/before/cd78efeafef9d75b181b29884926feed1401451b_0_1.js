function(subscriber, channel){
		var test = rules[channel][subscriber];
		return test === undefined ? false : test;
	}