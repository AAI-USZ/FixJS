function(args, silent) {
		var t = this, d = t.data, changed = [];
		for (var arg in args) if ( args.hasOwnProperty(arg) ) {
			if (arg in d && d[arg] === args[arg]) continue;
			t.previous[arg] = d[arg];
			d[arg] = args[arg];
			changed.push(arg);
		}
		if (!silent && changed.length) {
			t.trigger("change", changed);
		}
		return changed;
	}