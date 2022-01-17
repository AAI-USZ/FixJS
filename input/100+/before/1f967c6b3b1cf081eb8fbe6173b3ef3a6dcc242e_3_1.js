function(err, localPath){
					fs.readdir(localPath, function(err, files){	
						
						var countFiles = 0;
						for(var i=0; i< files.length; i++) {
					 		if (files[i].indexOf('cache') === -1
					 			&& files[i].indexOf('base') === -1) {
					 			countFiles++;
					 		}
					 	}
					 	
					 	var LIs = browser.queryAll('#sliderList li');
					 	expect(countFiles).to.equal(LIs.length);
					 	done();
					});      	
	      }