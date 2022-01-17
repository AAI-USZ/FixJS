function (cfg) {
		        expect(cfg.features[0].name).toEqual("feature:a9bb79c1");
		        expect(cfg.features[0].params.length).toEqual(0);//Ivan: Fixed (params is always defined so need to ensure it has nothing in it.
		    }