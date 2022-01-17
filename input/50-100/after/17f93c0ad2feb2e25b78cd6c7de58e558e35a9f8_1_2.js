function (data) {
		var map = {};
		map[onePath] = 'foo\n!bar';
		map[twoPath] = '!raz\ndwa\n';
		a(data.root, pgPath, '#3 Root');
		a.deep(omap(data.map, String), map, '#3 Data');
		return writeFile(rootFile, 'one\n\ntwo\n!three\n');
	}