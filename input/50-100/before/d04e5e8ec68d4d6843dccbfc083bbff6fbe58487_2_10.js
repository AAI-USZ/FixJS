function (cfg) {
		        expect(cfg.icons.length).toBeGreaterThan(0);
		        expect(cfg.icons[0].path).toEqual("locales/en/custom.png");
		        expect(cfg.icons[0].height).toBeUndefined();
		        expect(cfg.icons[0].width).toBeUndefined()
		    }