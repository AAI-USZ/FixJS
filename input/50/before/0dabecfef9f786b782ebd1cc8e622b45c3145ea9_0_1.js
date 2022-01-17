function invoke(func, proxy, args, wire) {
        return when(wire(args, proxy.path),
			function (resolvedArgs) {
				return proxy.invoke(func, asArray(resolvedArgs));
			}
		);
	}