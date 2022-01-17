function(amount,fixed) {
	this._vec.length = amount;
	this._len = amount;
	while(--amount > -1) {
		if(this._vec[amount] == null) this._vec[amount] = this._method();
	}
}