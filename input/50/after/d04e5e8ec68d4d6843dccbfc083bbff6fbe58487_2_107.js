function (cfg) {
		        expect(cfg.icons.length).toEqual(1);
		        expect(cfg.icons).toContain("pass.png");//Ivan: Pass.png is not present in icons, is it being set correctly or are we looking at the wrong part of icons, e.g. name
		    }