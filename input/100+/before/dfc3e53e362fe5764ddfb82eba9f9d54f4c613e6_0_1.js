function(amountSupply) {
		if (amountSupply < 0 || amountSupply > this.maxSupply) {
			throw 'The supply track ranges from 0 to 6.';
		}

		return this.supply[amountSupply];
	}