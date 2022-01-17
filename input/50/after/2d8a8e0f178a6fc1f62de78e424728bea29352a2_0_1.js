function getOrFailIfClobbered (prop, fallback) {
				if (prop in cfg && prop in prevCfg) throw new Error('can\'t override ' + prop);
				return newCfg[prop] || fallback;
			}