function(){

		spyOn(fs, "writeFile").andCallFake(function(file_path, body, encoding, callback){
			return callback("error");	
		});
	
		var spyCallback = jasmine.createSpy();
		cache_store.update("path/test", ".html", "test", spyCallback);

		expect(spyCallback).toHaveBeenCalledWith("error");

	}