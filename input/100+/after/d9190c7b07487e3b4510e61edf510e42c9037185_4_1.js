function(){
	
		spyOn(fs, "stat").andCallFake(function(file_path, callback){
			return callback(null, {"mtime": new Date(2012, 6, 21)});	
		});

		spyOn(fs, "readFile").andCallFake(function(file_path, encoding, callback){
			return callback("error", null);	
		});
	
		var spyCallback = jasmine.createSpy();
		cache_store.get("path/test", ".html", {}, spyCallback);	
		
		expect(spyCallback).toHaveBeenCalledWith("error", {"body": null, "updated_at": new Date(2012, 6, 21), "options": {"header": {"Content-Length": 0 }}});

	}