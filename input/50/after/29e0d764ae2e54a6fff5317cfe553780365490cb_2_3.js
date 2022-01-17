function SupportOrder(issuer) {
	Order.call(this, 'Support', issuer);

	this.execute = function() {
		//autodetect suportable units
		//allow the player to declare support (before cards are shown)
	};
}