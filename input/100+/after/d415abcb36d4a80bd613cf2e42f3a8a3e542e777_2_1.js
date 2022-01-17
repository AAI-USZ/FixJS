function () {
    var args = Array.prototype.slice.call(arguments), l = args.length;
    var child = this.prototype, childMeta = child.__meta, thisMeta = this.__meta, bases = child.__meta.bases, staticBases = bases.slice(),
        staticSupers = thisMeta.supers || [], supers = childMeta.supers|| [];
    for (var i = 0; i < l; i++) {
        var m = args[i], mProto = m.prototype;
        var protoMeta = mProto.__meta, meta = m.__meta;
        !protoMeta && (protoMeta = (mProto.__meta = {proto :mProto || {}}));
        !meta && (meta = (m.__meta = {proto :m.__proto__ || {}}));
        defineMixinProps(child, protoMeta.proto || {});
        defineMixinProps(this, meta.proto || {});
        //copy the bases for static,

        mixinSupers(m.prototype, supers, bases);
        mixinSupers(m, staticSupers, staticBases);
    }
    return this;
}