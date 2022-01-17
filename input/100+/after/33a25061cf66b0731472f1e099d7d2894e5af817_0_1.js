function(dir) {
	var json = path.join(dir, 'article.json'),
		md = path.join(dir, 'article.md'),
		article,
		config;

	if (fs.existsSync(json) && fs.existsSync(md)) {
		//clone to avoid altering same instance
		config = util.clone(require(json));

		if(config.publish) {
			config.author = flipflop.authors[config.author];
			config.slug = dir.split('/').pop();
			config.content = marked(fs.readFileSync(md, 'utf8'));
			article = new Article(config);
		}else {
			article = null;
		}
	}
	return article;
}