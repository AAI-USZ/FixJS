function () {
					preload = core.createResourceDef('*preload', cfg, true, '');
					core.getDeps(preload, preloads);
				}