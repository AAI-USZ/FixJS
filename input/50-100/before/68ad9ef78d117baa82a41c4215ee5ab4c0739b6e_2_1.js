function loadAll(file) {

	if(!file.type){

		xmlhttp(file,function(data,link) {

			loadAllWithFooter(data,link);

		}, file);

	}else{

		var reader = new FileReader();

		reader.onload = function() {

		loadAllWithFooter(reader.result);

		};

		reader.readAsArrayBuffer(file);

	}

}