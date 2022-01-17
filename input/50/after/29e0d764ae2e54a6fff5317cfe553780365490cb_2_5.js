function ConsolidatePowerOrder(issuer) {
	Order.call(this, 'Consolidate Power', issuer);

	this.execute = function() {
	};

	this.cancel = function() {
		throw 'Cannot cancel a consolidate power order.';
	};
}