function() {
		spyOn(marked, "setOptions");

		spyOn(marked, "call").andCallFake(function(input){
			return "parsed file";	
		});

		var spyCallback = jasmine.createSpy();
		markdown_parser.parse("test", spyCallback);

		expect(spyCallback).toHaveBeenCalledWith(undefined, "parsed file");

  }