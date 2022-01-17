function (cfg) {
			var preloads;
			preloads = cfg && cfg['preloads'];
			if (preloads && preloads.length > 0) {
				// chain from previous preload, if any.
				// TODO: revisit when doing package-specific configs.
				when(preload, function () {
					preload = core.getDeps(core.createContext(cfg, undef, preloads, true));
				});
			}

		}