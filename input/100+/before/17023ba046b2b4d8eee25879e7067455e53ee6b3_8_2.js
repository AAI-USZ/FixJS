function(data, pos) {
		var t = this, item = data;
		item instanceof t.model || (item = t.model(data), item.set(data, true));
		if (item.lists.indexOf(t) > -1) return false;
		item.lists.push(t);
		pos = pos !== void 0 ? pos : t.items.indexFor(item, t.sortFn, t);
		t.items.splice(pos , 0, item);
		t.trigger("add", item, pos);
		return t;
	}