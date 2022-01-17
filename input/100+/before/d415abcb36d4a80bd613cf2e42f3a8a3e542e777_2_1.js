function () {
    var args = Array.prototype.slice.call(arguments), l = args.length;
    var child = this.prototype, childMeta = child.__meta, thisMeta = this.__meta, bases = child.__meta.bases, staticBases = bases.slice(),
        staticSupers = thisMeta.supers, supers = childMeta.supers;
    for (var i = 0; i < l; i++) {
        var m = args[i];
        defineMixinProps(child, m.prototype.__meta.proto);
        defineMixinProps(this, m.__meta.proto);
        //copy the bases for static,

        mixinSupers(m.prototype, supers, bases);
        mixinSupers(m, staticSupers, staticBases);
    }
    return this;
}