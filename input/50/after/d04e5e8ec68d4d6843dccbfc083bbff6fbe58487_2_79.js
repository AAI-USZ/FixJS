function (cfg) {
		        expect(cfg.license.unicode).toEqual("");
		        expect(cfg.license.href).toEqual("test/pass.html");//Ivan: Cannot read property, the license element doesn't exists or the widget processor cannot find it.
		    }