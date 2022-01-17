function(compare, compareAgainstChanges) {
		var list = (compareAgainstChanges) ? this.changes : this.list,
			intersectors = [];
			
		for(var x = 0; x < list.length; x++) {
			if (list[x].elm[0] !== compare.elm[0] && !list[x].start && !list[x].adjusted && this.overlaps(compare,list[x])) {
				intersectors.push(list[x]);
			}
		}
		
		return intersectors;
    }