function Promise() {
		this.thens = arguments.length ? [arguments] : [];
	}