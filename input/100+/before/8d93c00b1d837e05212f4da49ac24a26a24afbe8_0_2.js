function ( req, resp ) {
	var fileName = (req.url=='/')?'./index.html':'.'+req.url;

	fs.stat(fileName, function ( err, stats ) {
		if (err === null && stats.isFile() ) {
			streamFile(resp, fileName);
		} else {
			if (err === null && stats.isDirectory()) {
				return ls(resp, fileName);
			};
			fileName += 'index.html';
			fs.stat(fileName, function ( err, stats ) {
				if (err === null && stats.isFile() ) {
					streamFile(resp, fileName);
				} else {
					if (err === null && stats.isDirectory()) {
						return ls(resp, fileName);
					};
					resp.writeHead(404);
					resp.end('File Not Found');
				}
			});
		}
	});
}