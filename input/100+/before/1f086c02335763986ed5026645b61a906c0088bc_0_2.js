function(compare) {
		var list = this.list,
			intersectors = [];

		for(var x = 0; x < list.length; x++) {
			if (list[x].elm[0] !== compare.elm[0] && this.overlaps(compare,list[x])) {
				intersectors.push(list[x]);
			}
		}

		return intersectors;
    }