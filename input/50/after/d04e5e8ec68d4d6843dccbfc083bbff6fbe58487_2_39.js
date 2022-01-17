function (cfg) {
		        expect(cfg.startFile.path).toEqual("index.html");
		        expect(cfg.startFile.contentType).toEqual("text/html");//Ivan: Again it's failing on the type check (correct syntax)
		    }