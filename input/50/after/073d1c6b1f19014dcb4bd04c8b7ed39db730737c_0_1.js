function (x) {
	if(x instanceof Expression.Statement && !(this[0] instanceof Expression.Statement)) {
		// This is a domain restriction, not a vector!
		// The result is a quantity and assertion
		// or perhaps it is a quantity defined only when the statement is true?
		
		
	}
	this[this.length] = x;
	return this;
}