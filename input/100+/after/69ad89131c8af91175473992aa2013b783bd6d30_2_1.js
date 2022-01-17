function(){
		spyOn(fs, "stat").andCallFake(function(dirpath, callback){
			return callback(null, {"isDirectory": function(){ return false }});
		});

		spyOn(fs, "mkdir").andCallFake(function(dirpath, callback){
			return callback(null);	
		});

		spyOn(fs, "writeFile");

		cache_store.outputDir = "output_dir";
	
		var spyCallback = jasmine.createSpy();
		cache_store.update("path/subdir/test", ".html", "test", spyCallback);

		expect(fs.mkdir.callCount).toEqual(3);

	}