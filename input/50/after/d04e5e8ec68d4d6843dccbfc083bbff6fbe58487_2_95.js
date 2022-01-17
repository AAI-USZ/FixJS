function (cfg) {
		        expect(cfg.startFile.path).toEqual("index.php");
		        expect(cfg.startFile.contentType).toEqual("text/html");//Ivan: Fixed. Type should be ContentType
		    }