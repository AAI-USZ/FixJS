function _init() {
    // this is imports.gi.GLib

    GLib = this;

    // small HACK: we add a matches() method to standard Errors so that
    // you can do "catch(e if e.matches(Ns.FooError, Ns.FooError.SOME_CODE))"
    // without checking instanceof
    Error.prototype.matches = function() { return false; }

    this.Variant.new = function (sig, value) {
	let signature = Array.prototype.slice.call(sig);

	let variant = _pack_variant(signature, value);
	if (signature.length != 0)
	    throw new TypeError('Invalid GVariant signature (more than one single complete type)');

	return variant;
    }
    this.Variant.prototype.unpack = function() {
	return _unpack_variant(this, false);
    }
    this.Variant.prototype.deep_unpack = function() {
	return _unpack_variant(this, true);
    }
    this.Variant.prototype.toString = function() {
	return '[object variant of type "' + this.get_type_string() + '"]';
    }
}