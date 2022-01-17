function ConsolidatePowerOrder() {
	Order.call(this, 'Consolidate Power', area);

	this.execute = function() {
	};

	this.cancel = function() {
		throw 'Cannot cancel a consolidate power order.';
	};
}