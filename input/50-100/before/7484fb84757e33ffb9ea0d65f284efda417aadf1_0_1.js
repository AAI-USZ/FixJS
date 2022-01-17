function(elm, t) {
    var bsec = G.__isecBounds(this.bounds(t),
                              elm.bounds(t));
    if (!opts.pathCheck) return bsec;
    throw new Error('Not implemented');
}