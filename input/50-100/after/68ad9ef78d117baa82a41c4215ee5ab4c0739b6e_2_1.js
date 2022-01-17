function loadAll(file,cb) {

	if(!file.type){

		xmlhttp(file,function(data,link) {

			loadAllWithFooter(data,link,cb);

		}, file);

	}else{

		var reader = new FileReader();

		reader.onload = function() {

		loadAllWithFooter(reader.result,cb);

		};

		reader.readAsArrayBuffer(file);

	}

}