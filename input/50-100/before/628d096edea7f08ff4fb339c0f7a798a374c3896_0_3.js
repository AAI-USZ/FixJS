function createProxy(object, spec) {
			var proxier, proxy, id, i;

			i = 0;

			while ((proxier = proxiers[i++]) && !(proxy = proxier(object, spec))) {}

			proxy.target = object;
			proxy.spec = spec;

			if(spec) {
				id = spec && spec.id;
				proxy.id = id;
				proxy.path = createPath(id);
				proxiedComponents.push(proxy);
			}

			return proxy;
		}