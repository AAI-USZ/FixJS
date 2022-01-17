function queryOneManySelector(selector) {
	return queryManySelector.call(this, selector, true)[0] || null;
}