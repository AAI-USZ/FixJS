function (comparator, limit, atEnd) {
		var container = atEnd ? this.endContainer : this.startContainer,
		    limit = limit ? limit[0] : null,
		    parents = selfAndParentsUntil(container, limit),
		    i,
		    len;
		for (i = 0, len = parents.length; i < len; i++) {
			if (comparator.apply(parents[i])) {
				return parents[i];
			}
		}
		return false;
	}