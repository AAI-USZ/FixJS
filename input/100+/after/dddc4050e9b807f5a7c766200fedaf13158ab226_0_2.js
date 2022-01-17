function fileServer(filename, request, response, next)
{
	var file = mod_fs.createReadStream(filename);
	var headers = {};

	if (mod_jsprim.endsWith(request.url, '.mov'))
		headers['Content-Type'] = 'video/quicktime';

	file.on('error', function (err) {
		if (err['code'] == 'ENOENT') {
			next(new mod_restify.ResourceNotFoundError());
			return;
		}

		request.log.error(err);
		next(err);
	});

	file.on('open', function () {
		file.removeAllListeners('error');
		response.writeHead(200, headers);
		file.pipe(response);

		file.on('error', function (err) {
			request.log.warn(err);
			response.end();
		});
	});

	file.on('end', next);
}