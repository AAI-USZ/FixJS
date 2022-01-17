function (limit, fromEnd) {
		// TODO cache the calculated parents
		var
			container = fromEnd ? this.endContainer : this.startContainer,
			parents, limitIndex,
			i;

		if (!container) {
			return false;
		}

		if ( typeof limit === 'undefined' || ! limit ) {
			limit = jQuery('body');
		}

		
		if (container.nodeType == 3) {
			parents = jQuery(container).parents();
		} else {
			parents = jQuery(container).parents();
			for (i = parents.length; i > 0; --i) {
				parents[i] = parents[i - 1];
			}
			parents[0] = container;
		}

		// now slice this array
		limitIndex = parents.index(limit);

		if (limitIndex >= 0) {
			parents = parents.slice(0, limitIndex);
		}

		return parents;
	}