function(){
		var spyCompile = jasmine.createSpy();

		renderer.compilers = {
			".js": { "compile": spyCompile, "input_extensions": [".coffee"] }
		};

		var spyGetTemplates = jasmine.createSpy();
		spyGetTemplates.andCallFake(function(basepath, callback){
			callback(null, [{"full_path": "path/test.html", "last_modified": new Date(2012, 6, 13) },
											{"full_path": "path/test.coffee", "last_modified": new Date(2012, 6, 13) } 
										 ]);	
		});

		var spyReadTemplate = jasmine.createSpy();
		spyReadTemplate.andCallFake(function(path, callback){
			callback(null, "template output");	
		});

		renderer.templates = {
			"getTemplates": spyGetTemplates,
			"readTemplate": spyReadTemplate
		};
		
		var spyCallback = jasmine.createSpy();
		renderer.compileTo("path/test.js", ".js", null, spyCallback);	

		expect(spyCompile).toHaveBeenCalledWith("template output", spyCallback);

	}