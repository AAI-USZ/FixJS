function loadAll(file,cb) {

	if(!(file instanceof FileList)){

		xmlhttp(file,function(data,link) {

			loadAllWithFooter(data,link,cb);

		}, file);

	}else{

		for(var i = 0; i < file.length;i++){

		var reader = new FileReader();

		reader.onload = function() {

		loadAllWithFooter(this.result,cb);

		};

		reader.readAsArrayBuffer(file[i]);

		}

	}

}