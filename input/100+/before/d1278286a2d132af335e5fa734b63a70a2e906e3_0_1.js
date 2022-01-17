function () {

		var data = fs.readFileSync('dist/app.min.js', 'utf8');



		gzip(data, function(err, data) {

			if (err) {

				throw err;

			}



			fs.writeFileSync('dist/app.min.js.gz', data);



			complete();

		});



	}, {async: true}