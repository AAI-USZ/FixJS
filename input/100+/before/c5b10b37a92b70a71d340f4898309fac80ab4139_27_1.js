function cont(){
	console.log('running tests in dirs: ' + JSON.stringify(dirs))
	
	var cdl = _.latch(dirs.length, moreCont)
	
	dirs.forEach(function(dir){
		fs.readdir(dir, function(err, files){
			if(err) throw err
			
			//log('got dir files: ' + dir + ' ' + JSON.stringify(files))
			
			files.forEach(function(file){
				if(file.match(file_matcher)){
					//log('requiring: ' + file)
					var t = require(dir+'/'+file)
					each(t, function(test, name){
						//log('got test')
						if(includedTest && includedTest !== name) return
						
						tests.push({name: name, test: test, dir: dir, dirName: path.basename(dir)})
					})
				}
			})
			cdl()
		})
	})
}