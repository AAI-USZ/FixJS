function protoFactory(resolver, spec, wire) {
		var parentRef, promise;

        parentRef = spec.prototype;

        promise = typeof parentRef === 'string'
                ? wire.resolveRef(parentRef)
                : wire(parentRef, spec.id);

        when(promise, Object.create)
			.then(resolver.resolve, resolver.reject);
	}