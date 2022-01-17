function (cfg) {
		        expect(cfg.icons.length).toBeGreaterThan(0);
		        expect(cfg.icons[0].path).toEqual("locales/en/custom.png");
		        expect(cfg.icons[0].height).toEqual(0);
		        expect(cfg.icons[0].width).toEqual(0);//Ivan: Is not checking for height and width being -1 properly or there is a default of -1.
		    }