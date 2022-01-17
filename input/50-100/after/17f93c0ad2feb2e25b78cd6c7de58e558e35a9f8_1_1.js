function () {
		var map = {};
		map[onePath] = 'foo\n!bar';
		map[twoPath] = '!raz\ndwa\n';
		a(invoked, data, "#3 invoked");
		invoked = false;
		a(data.root, pgPath, '#3 Root');
		a.deep(omap(data.map, String), map, '#3 Data');
		return t(twoPath, mode);
	}