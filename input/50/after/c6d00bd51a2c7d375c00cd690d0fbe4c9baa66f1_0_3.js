function() {
	function F(){}
	F.prototype = QUnit;
	QUnit = new F();
	//Make F QUnit's constructor so that we can add to the prototype later
	QUnit.constructor = F;
}