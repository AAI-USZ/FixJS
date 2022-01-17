function (sig, value) {
	let signature = Array.prototype.slice.call(sig);

	let variant = _pack_variant(signature, value);
	if (signature.length != 0)
	    throw new TypeError('Invalid GVariant signature (more than one single complete type)');

	return variant;
    }