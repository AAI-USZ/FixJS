function prepare( SH, url, response ) {
	var o, p    = path.normalize( process.cwd() + url.pathname ),
		ext     = path.extname( p ).substring( 1 ),
		stat    = path.existsSync( p ) ? fs.statSync( p ) : false,
		headers = {
			'Content-Length' : stat.size,
			'Date'           : new Date().toUTCString(),
			'Last-Modified'  : new Date( stat.mtime ).toUTCString(),
			'Server'         : server_info
		};

	headers['Content-Type'] = mime.lookup( ext );

	if ( stat && stat.isFile() ) o = {
		ext      : ext,
		fns      : [],
		file_buf : fs.readFileSync( p ),
		headers  : headers,
		status   : 200,
		success  : true,
		url      : url.pathname
	};
	else {
		o = {
			ext      : 'txt',
			fns      : [],
			file_buf : util.format( '404 %s not found.', url.pathname ),
			headers  : headers,
			status   : 404,
			success  : false,
			url      : url.pathname
		};
		o.headers['Content-Length'] = o.file_buf.length;
		o.headers['Content-Type']   = mime.lookup( 'txt' );
	}

	typeof SH.__maxAge[ext] != 'number'
	|| ( o.headers['Cache-Control'] = util.format( 'max-age=%d', SH.__maxAge[ext] ) );

	return SH.useCompression ? compress( SH, o, response ) : o;
}