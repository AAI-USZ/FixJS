function(subscriber, channel){
		if (!rules[channel]) {
			throw new Error("No permissions defined for " + channel);
		}

		var test = rules[channel][subscriber];
		return test === undefined ? false : test;
	}