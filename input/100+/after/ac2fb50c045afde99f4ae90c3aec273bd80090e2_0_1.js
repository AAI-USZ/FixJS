function (path) {
	var exec = require('child_process').exec,
		linter = require("jslint/lib/linter"),
		reporter = require("jslint/lib/reporter"),
		config = require('milo/utils').getConfig(),
		fs = require('fs'),
		files = [],
		stat;

	if (!fs.existsSync(path)) {
        path = config.yuiPath + 'src/' +  path + '/js';
	}

	stat = fs.statSync(path, 'utf-8');
	if (stat.isDirectory()) {
		fs.readdirSync(path).forEach(function(file){
			if (file.match('.js')) {
				files.push(path + "/" + file);
			}
		});
	}
	else {
		files.push(path);
	}
	
	files.forEach(function (file) {
		var code = fs.readFileSync(file, 'utf-8'),
			result = linter.lint(code, config.jslintOptions);

		reporter.report(file, result);
	});
}