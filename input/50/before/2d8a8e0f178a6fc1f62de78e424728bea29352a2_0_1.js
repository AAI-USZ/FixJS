function getOrFailIfClobbered (prop, fallback) {
				if (prop in cfg && prop in currCfg) throw new Error('can\'t override ' + prop);
				return newCfg[prop] || fallback;
			}