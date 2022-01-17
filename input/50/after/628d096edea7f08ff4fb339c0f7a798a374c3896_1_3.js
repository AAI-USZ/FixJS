function () {
				return when.chain(processListeners(step, proxy, config), d, proxy);
			}