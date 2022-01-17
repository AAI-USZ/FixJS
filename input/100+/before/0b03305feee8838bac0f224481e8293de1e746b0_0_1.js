function getConfigFromFile(filePath){
		console.info('Read cmd-conf configurtion from '+filePath);
		var fs = require('fs');
		var path = require('path');
		var filePath = path.resolve(process.cwd,filePath);
		if(!path.existsSync(filePath)){
			console.error('Can\'t find '+filePath);
			return;
		}
		try{
			var content = fs.readFileSync(filePath).toString();
		} catch(err){
			console.error(err.name+': Can\'t read file \''+filePath+'\'');
			return;
		}
		try{
			content = JSON.parse(content);
		} catch (err){
			console.error(err.name+': The JSON file is\'nt correctly formed');
			return;
		}
		return content;
	}