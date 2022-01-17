function help() {
	process.argv = ['node', 'mocha', '--help'];
	var helpStr = ['USAGE: mr-coverage [project-directory] [spec-directory or spec-files] + (mocha Options below, no need to set file path)'].join('\n')
	console.log(helpStr);
	require('./lib/mocha-coverage');
}