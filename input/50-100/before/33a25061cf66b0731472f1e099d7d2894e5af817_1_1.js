function() {
		this.articlesDir = path.join(
			this.blogDir,
			this.config.articles
		);

		this.log('creating blog directory: ' + this.blogDir);
		if(path.existsSync(this.blogDir)) wrench.rmdirSyncRecursive(this.blogDir);
		fs.mkdirSync(this.blogDir);

		this.createArticlesDirectory();
		this.createSampleArticle();
		this.createThemeDirectory();
		this.createBlogConfig();
	}