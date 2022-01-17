function () {
					preload = core.createResourceDef('*preload', cfg, false, '');
					// TODO: figure out a better way to pass isPreload
					preload.isPreload = true;
					core.getDeps(preload, preloads);
				}