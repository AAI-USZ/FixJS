function(err, results){
		if ( err){
			// either file1, file2 or file3 has raised an error, so you should not use results and handle the error
		} else {
			var content = results[0];
			var slides = req.param('slides', null);
			slides = JSON.parse(slides);
			for(var i in slides) {
				if(Array.isArray(slides[i])) {
					var array = slides[i];
					content += '<section>';
					array.forEach(function(s){
						content += '<section>' + s + '</section>';
					});
					content += '</section>';
				} else {
					content += slides[i];
				}
			}
			content += results[1];
			var archive = new zip();
			archive.add('index.html', new Buffer(content, "utf8"));
			archive.add('css/main.css', new Buffer(results[2], "utf8"));
			archive.add('lib/js/head.min.js', new Buffer(results[3], "utf8"));
			archive.add('js/reveal.js', new Buffer(results[4], "utf8"));
			archive.add('lib/js/highlight.js', new Buffer(results[5], "utf8"));
			archive.add('lib/js/classList.js', new Buffer(results[6], "utf8"));
			archive.add('lib/css/zenburn.css', new Buffer(results[7], "utf8"));
			archive.add('css/reset.css', new Buffer(results[8], "utf8"));
			archive.add('css/print.css', new Buffer(results[9], "utf8"));
			archive.add('lib/font/league_gothic-webfont.ttf', new Buffer(results[10]));
			res.attachment('kreator.zip');
			res.send(archive.toBuffer());
		}
	}