function attemptMergeWithPrevious(e, allowDifferentListStyles, mergeParagraphs) {
		var prev = skipWhitespaceNodesBackwards(e.previousSibling);
		if (prev) {
			return attemptMerge(prev, e, allowDifferentListStyles ? prev : false, mergeParagraphs);
		} else {
			return e;
		}
	}