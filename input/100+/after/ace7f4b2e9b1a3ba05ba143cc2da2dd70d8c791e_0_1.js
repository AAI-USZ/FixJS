function serveFile(req, res, type, content, gzippedContent){
	_.assertLength(arguments, 5);
	
	if(exports.do304IfSafe(req, res)){
		return;
	}
	/*
	//this bit here is to work around a Chrome bug
	var chromeException = 
		(req.header('User-Agent') && req.header('User-Agent').indexOf('Chrome')) !== -1 && 
		req.header('Cache-Control') === 'max-age=0';
	
	if((req.header('Cache-Control') !== undefined && !chromeException) || req.header('Expires') !== undefined){
		//console.log('headers: ' + JSON.stringify(req.headers));
		res.header('Content-Type', '');
		res.send(304);
	}else{
*/
		/*var headers = {
			'Cache-Control': 'public max-age=2592000', 
			'Expires': 'Sat, 28 Apr 2100 10:00:00 GMT',
			'Content-Type': getMimeType(type) + ';charset=utf-8'};*/
		res.header('Cache-Control', 'public max-age=2592000')
		res.header('Expires', 'Sat, 28 Apr 2100 10:00:00 GMT')
		res.header('Content-Type', getMimeType(type) + ';charset=utf-8')

		var fileContents;

		var compHeader = req.header('Accept-Encoding');
		if(compHeader && compHeader.indexOf('gzip') !== -1 && gzippedContent !== undefined){
			fileContents = gzippedContent;
			//headers['Content-Encoding'] = 'gzip';
			res.header('Content-Encoding', 'gzip')
		}else{
			fileContents = content
		}
		
		if(fileContents === undefined){
			_.errout('file contents missing for ' + path);
		}
		//console.log('looking for file: ' + app.name + ':' + name);
	/*	
		
		if(chromeException){
			headers['Warning'] = 'Working around Chrome 304 bug';
		}*/
		res.send(fileContents);
	//}
}