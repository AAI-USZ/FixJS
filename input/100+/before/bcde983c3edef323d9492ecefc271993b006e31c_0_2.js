function (name, type, convert_to_lower) {
	var filename = path.resolve(__dirname, '../dicts', name);
	if (!type)	type = 'TABLE';			// 默认为TABLE
	if (!path.existsSync(filename))
		throw Error('Cannot find dict file "' + filename + '".');
	else {
		// 初始化词典
		if (!this.DICT[type])
			this.DICT[type] = {};
		if (!this.DICT[type + '2'])
			this.DICT[type + '2'] = {};
		var TABLE = this.DICT[type];			// 词典表  '词' => {属性}
		var TABLE2 = this.DICT[type + '2'];	// 词典表  '长度' => '词' => 属性
		// 导入数据
		var POSTAG = this.POSTAG;
		var data = fs.readFileSync(filename, 'utf8');
		if (convert_to_lower)
			data = data.toLowerCase();
		var lines = data.split(/\r?\n/);
		
		for (var i = 0, line; line = lines[i]; i++) {
			var blocks = line.split('|');
			if (blocks.length > 2) {
				var w = blocks[0].trim();
				var p = Number(blocks[1]);
				var f = Number(blocks[2]);
				
				TABLE[w] = {f: f, p: p};
				if (!TABLE2[w.length])
					TABLE2[w.length] = {};
				TABLE2[w.length][w] = {f: f, p: p};
			}
		}
		return this;
	}
}