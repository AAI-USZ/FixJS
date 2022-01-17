function (comparator, limit, atEnd) {
		var container = atEnd ? this.endContainer : this.startContainer,
		    limit = limit ? limit[0] : null,
		    parents,
		    i,
		    len;
		if (!container) {
			return;
		}
		parents = selfAndParentsUntil(container, limit);
		for (i = 0, len = parents.length; i < len; i++) {
			if (comparator.apply(parents[i])) {
				return parents[i];
			}
		}
		return false;
	}