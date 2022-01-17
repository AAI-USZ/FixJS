function (module) {
	if (module instanceof Array) {
		for (var i in module)
			this.use(module[i]);
	}
	else {
		if (typeof module == 'string') {
			var filename = path.resolve(__dirname, 'module', module + '.js');
			if (!path.existsSync(filename))
				throw Error('Cannot find module "' + module + '".');
			else
				module = require(filename);
		}
		// 初始化并注册模块
		module.init(this);
		this.modules[module.type].push(module);
	}
	
	return this;
}