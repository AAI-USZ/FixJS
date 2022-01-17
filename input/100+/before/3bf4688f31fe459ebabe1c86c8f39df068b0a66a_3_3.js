function(sliderName, done){
	var fs = require('fs');
	
	function cleanCache(){
			fs.realpath('../', function(err, localPath){
				var dirPath = localPath + '/sliders/cache';
	      try { var files = fs.readdirSync(dirPath); }
	      catch(e) { return; }
	      if (files.length > 0) {
	        for (var i = 0; i < files.length; i++) {
	          var filePath = dirPath + '/' + files[i];
	          if (fs.statSync(filePath).isFile())
	            fs.unlinkSync(filePath);
	          else rmDir(filePath);
	        }
	      }
	      //fs.rmdirSync(dirPath);
      			
				done();
			});
		}
		
	
	fs.realpath('../', function(err, localPath){
		fs.unlink(localPath + '/sliders/' + sliderName + '.json', function(err){
			if(err && err.code != "ENOENT") done(err);
			else fs.rmdir(localPath + '/public/slider/' + sliderName + '/images', function(err){
					if(err && err.code != "ENOENT") done(err);
					else fs.rmdir(localPath + '/public/slider/' + sliderName, function(err){
						if(err && err.code != "ENOENT") done(err);
						else cleanCache();
					});
				});
		});
	});
	
}