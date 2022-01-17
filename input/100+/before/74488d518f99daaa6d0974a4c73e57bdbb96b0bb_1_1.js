function sortFilesDesc(allfiles){
		var files = [];
		for(var i=0; i<allfiles.length;i++){
			if (allfiles[i].indexOf(_slider.name + '.json-') > -1){
				files.push(parseInt(allfiles[i].split('-')[1]));
			}
		}
		
		files.sort(function(a, b){ return b-a } );
		
		fileRecovered = _slider.name + '.json-' + files[index-1];
		fsAccess.getJSONFile(error, '/sliders/cache/' + fileRecovered, saveNew);
	}