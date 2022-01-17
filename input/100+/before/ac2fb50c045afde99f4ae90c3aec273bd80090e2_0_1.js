function (file) {
		var code = fs.readFileSync(file, 'utf-8'),
			result = linter.lint(code, config.jslintOptions);

		reporter.report(file, result);
	}