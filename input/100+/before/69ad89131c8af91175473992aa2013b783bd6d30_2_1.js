function(){

		spyOn(fs, "writeFile");
	
		var spyCallback = jasmine.createSpy();
		cache_store.update("path/test", ".html", "test", spyCallback);

		expect(fs.writeFile.mostRecentCall.args.splice(0, 2)).toEqual(["output_dir/path/test.html", "test"]);

	}