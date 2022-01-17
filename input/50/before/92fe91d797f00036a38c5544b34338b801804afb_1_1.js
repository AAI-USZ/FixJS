function() {
		var o = new TestModelPrimaryKeyOverride();
		expect(o.isValidAttributeKey("foo_id")).toEqual(true);
		expect(o.foo_id).toBeNull();
	}