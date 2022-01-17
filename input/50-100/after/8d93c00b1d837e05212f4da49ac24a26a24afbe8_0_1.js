function getMime( file ) {
	switch (path.extname(file)) {
		case '.coffee':
			return 'text/coffee-script';
		case '.css':
			return 'text/css';
		case '.htm':
		case '.html':
			return 'text/html'
		case '.js':
			return 'text/javascript';
		case '.json':
			return 'text/json';
		case '.md':
			return 'text/markdown';
		case '.yml':
			return 'text/yaml';
		default:
			return 'application/octet-stream'
	}
}