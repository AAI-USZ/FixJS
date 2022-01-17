function(el) {
		var cache = this.getCache(el),
			reference = [];
		
		// create copy of list
		this.changes = $.extend(true, [], this.list);
		this.first = null;

		this.recursion(cache);
	}