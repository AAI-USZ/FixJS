function writeFile(res, info, next){
	var filePath = bndlr.getFilePath(info),
		type = contentType(info);

	if(info.canCompress === false){
		// stream
		var stream = fs.createReadStream(filePath);
		stream.on('error', function(err){
			if(err.code=="ENOENT")
				next();
			else
				res.send(500);
		});
		res.writeHead(200,{"Content-Type":type});
		stream.pipe(res);
		return;
	}

	fs.readFile(filePath, 'utf8', function (err, data) {
		if (err) return next();

		if(info.min){
			var compressor = bndlr.StaticFile.compressors[info.type];
			if(compressor){
				try{
					data = compressor(data);
				}
				catch(e){
					res.writeHead(500,{"Content-Type":type});
					if(bndlr.StaticFile.onWrite.error)
						bndlr.StaticFile.onWrite.error(e, info);
					else res.write(e);
					return res.end();
				}
			}
		}
		res.writeHead(200,{"Content-Type":type});
		res.write(data);
		res.end();
	});
}