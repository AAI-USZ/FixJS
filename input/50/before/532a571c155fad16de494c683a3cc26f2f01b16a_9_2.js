function attemptMergeWithNext(e, allowDifferentListStyles, mergeParagraphs) {

		var next = skipWhitespaceNodesForwards(e.nextSibling);

		if (next) {

			return attemptMerge(e, next, allowDifferentListStyles ? next : false, mergeParagraphs);

		} else {

			return e;

		}

	}