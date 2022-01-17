function (cfg) {
		        expect(cfg.author.name).toEqual("PASS");//Ivan: Author and href are not being set to pass but email is. Syntax error?
		        expect(cfg.author.href).toEqual("PASS");
		        expect(cfg.author.email).toEqual("PASS");
		    }