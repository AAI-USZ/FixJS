function (cfg) {
		        expect(cfg.license.ASCII).toEqual("\u000A \u0009 \u0050 \u000A \u0009 \u0041 \u000A \u0009 \u0053 \u000A \u0009 \u0053 \u000A");//Ivan: The function for getting the license element content appears to be broken (fails on all tests).
		    }