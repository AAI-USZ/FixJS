function (cfg) {
		        expect(cfg.icons.length).toEqual(1);
		        expect("pass.png" in cfg.icons).toBeTruthy();
		    }