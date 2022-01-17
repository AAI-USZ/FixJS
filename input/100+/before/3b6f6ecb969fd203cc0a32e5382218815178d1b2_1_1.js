function (code) {

					fs.readdirSync(dir).forEach(function(file){
						console.log('\t' + file);
					});

					console.log('');
				}