function(d) {
		this._super(d);
		this.fields = this.fields.concat([
			"`tabPurchase Receipt`.supplier_name",
			"`tabPurchase Receipt`.purchase_order_no"
		]);
	}