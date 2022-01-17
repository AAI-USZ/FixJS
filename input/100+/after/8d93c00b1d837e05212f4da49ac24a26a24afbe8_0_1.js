function ( err, stats ) {
		if (err === null && stats.isFile() ) {
			streamFile(resp, nodeName);
		} else {
			if (err === null && stats.isDirectory()) {
				fileName = nodeName + 'index.html';
				fs.stat(fileName, function ( err, stats ) {
					if (err === null && stats.isFile() ) {
						streamFile(resp, fileName);
					} else {
						return ls(resp, nodeName);
					}
				});
			} else {
				resp.writeHead(404);
				resp.end('File Not Found');
			};
		}
	}