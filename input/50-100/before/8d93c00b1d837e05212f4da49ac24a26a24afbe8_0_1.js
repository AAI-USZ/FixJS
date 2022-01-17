function getMime( file ) {
	switch (path.extname(file)) {
		case '.js':
			return 'text/javascript';
		case '.css':
			return 'text/css';
		case '.htm':
		case '.html':
			return 'text/html'
		default:
			return 'application/octet-stream'
	}
}