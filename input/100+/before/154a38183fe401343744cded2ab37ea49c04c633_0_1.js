function (err, data) {
		if (err) {
			response.writeHead(500, {'content-type':'text/html; charset=utf-8'});
			response.end(err.toString());
		}

		var out
		  , download = false
		  , context;

		context = {
			PageTitle: 'nJSt demonstration #2',
			DownloadPage: function () {
				download = true;
			}
		};

		out = njst.parse(data, context);

		if (download) {
			response.writeHead(200, {
				'content-type': 'application/octet-stream; charset=utf-8',
				'content-disposition': 'attachment; filename="page.html"',
				'accept-ranges': 'bytes',
				'content-length': Buffer.byteLength(out)
			});
		} else {
			response.writeHead(200, {'content-type':'text/html; charset=utf-8'});
		}
		response.end(out.toString());
	}