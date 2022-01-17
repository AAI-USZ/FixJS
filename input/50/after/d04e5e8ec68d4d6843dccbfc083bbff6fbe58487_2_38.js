function (cfg) {
		        expect(cfg.startFile.path).toEqual("index.htm");
		        expect(cfg.startFile.contentType).toEqual("text/html"); //Ivan: This is incorrect, test for index.htm appears to pass but type check does not.
		    }