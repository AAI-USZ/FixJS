function initStates() {
	var elevenCentComboState = createComboState(11, [3], [8], null);
	var tenCentComboState = createComboState(10, [3], [7], elevenCentComboState);
	var nineCentComboState = createComboState(9, [3], [6], tenCentComboState);
	var eightCentState = createCoinState(8, nineCentComboState);
	var sevenCentState = createCoinState(7, eightCentState);
	var sixCentState = createCoinState(6, sevenCentState);

	currentState = null;
}