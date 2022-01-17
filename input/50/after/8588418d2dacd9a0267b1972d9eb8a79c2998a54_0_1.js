function unlink(container) {
		container = $(container); // container was an element or selector
		container.off(elementChangeStr, elemChangeHandler);
		clean(container[0]);
	}