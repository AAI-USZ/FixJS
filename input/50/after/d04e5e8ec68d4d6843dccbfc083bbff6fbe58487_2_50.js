function (cfg) {
		        expect(cfg.author.name).toEqual("PASS");//Ivan: href and email are correct but name is not (does the repeition have the same or no href and email element?
		        expect(cfg.author.href).toEqual("PASS:");
		        expect(cfg.author.email).toEqual("PASS");
		    }