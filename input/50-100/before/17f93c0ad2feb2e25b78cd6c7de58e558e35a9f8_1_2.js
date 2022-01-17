function () {
		var map = {};
		map[pgPath] = 'one\n\ntwo\n!three\n';
		map[onePath] = 'foo\n!bar';
		map[twoPath] = '!raz\ndwa\n';
		a(invoked, data, "#4 invoked");
		invoked = false;
		a(data.root, pgPath, '#4 Root');
		a.deep(omap(data.map, String), map, '#4 Data');
		return mkdir(gitTwo);
	}