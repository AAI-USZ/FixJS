function () {

	var fs = require('fs'),
		exec = require('child_process').exec,
		libraries = require(miloPath + 'config.public').libraries,
		config, id;

	for(id in libraries) {
		config = require('../../utils').getConfig.apply({library:id});

		var dir = miloPath + 'libraries/' + id + '/',
			git_url;

		if (libraries[id].source) {
			if (config.push) {
				git_url = 'git@gist.github.com:/' + libraries[id].source + '.git';
			}
			else {
				git_url = 'git://gist.github.com/' + libraries[id].source + '.git';
			}

			if (fs.existsSync(dir)) {
				console.log('Updating ' + id + ' ...');
				exec('git pull ', {cwd: dir});
			}
			else {
				console.log('Cloning ' + id + ' ...');
				exec('git clone ' + git_url + ' ' + id + '; mkdir ' + dir + 'assets;', {cwd: miloPath + 'libraries/'});
			}
		}
	}
}