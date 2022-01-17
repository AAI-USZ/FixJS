function(dest, template, data) {
		var	html = this.renderTemplate(template, data),
			destDir = '/'+(dest.split('/').slice(1, -1).join('/'));

		if(!fs.existsSync(destDir)) {
			wrench.mkdirSyncRecursive(destDir);
		}
		fs.writeFileSync(dest, html);
		flipflop.info('created file:\t\t', dest);
	}