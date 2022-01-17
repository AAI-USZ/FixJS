function(item) {
		var t = this, m = item.lists;
		if (m.length != m.remove(t).length) {
			t.items.remove(item);
			t.trigger("remove", item);
		}
	}