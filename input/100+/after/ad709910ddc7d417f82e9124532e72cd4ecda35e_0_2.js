function(n, callback) {
		for(var i = 0; i < this.accounts.length; i++) {
			if (this.accounts[i].account == n)
				return this.scanAccountHistory(i, callback);
		}
		return false;
	}