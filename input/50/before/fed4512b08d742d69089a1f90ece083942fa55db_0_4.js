function List_Real(x, operator) {
	x.__proto__ = _;
	if(operator !== undefined) {
		x.operator = operator;
	}
	return x;
}