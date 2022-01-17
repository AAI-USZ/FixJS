function (target, source) {
    var name, s, t;
    for (name in source) {
        s = source[name], t = target[name];
        if (!_deepEqual(t, s)) {
            if (comb.isHash(t) && comb.isHash(s)) {
                target[name] = deepMerge(t, s);
            } else if (comb.isHash(s)) {
                target[name] = deepMerge({}, s);
            } else {
                target[name] = s;
            }
        }
    }
    return target;
}