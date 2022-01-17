function updateStats() {

	var doneCount = goog.array.reduce(items, function(count, model) {

		return model.isDone() ? count + 1 : count;

	}, 0);

	var remainingCount = items.length - (/**@type {number}*/ doneCount); 

	itemCountControl.setContent((/**@type {string}*/ remainingCount));

	itemCountControl.setVisible(remainingCount > 0);

	clearCompletedControl.setContent((/**@type {string}*/ doneCount));

	clearCompletedControl.setVisible((/**@type {number}*/ doneCount) > 0);

}