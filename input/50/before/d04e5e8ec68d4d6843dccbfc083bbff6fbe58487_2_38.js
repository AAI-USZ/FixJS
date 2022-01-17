function (cfg) {
		        expect(cfg.startFile.path).toEqual("index.htm");
		        expect(cfg.startFile.type).toEqual("text/html"); //TODO -- Correct way to check type?
		    }