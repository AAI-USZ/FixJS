function(d) {
		this._super(d);
		this.fields = this.fields.concat([
			"`tabPurchase Receipt`.supplier_name",
			"group_concat(`tabPurchase Receipt Item`.prevdoc_docname) as purchase_order_no",
		]);
	}