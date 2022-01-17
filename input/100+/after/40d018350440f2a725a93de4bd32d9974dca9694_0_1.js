function (async, cb, limit) {
    var saves = [];
    limit = limit || LIMIT;
    for (var i = 0; i < limit; i++) {
        saves.push(async ? cb(i) : comb.partial(cb, i));
    }
    if (async) {
        saves = new comb.PromiseList(saves, true);
    }
    return async ? saves : comb.serial(saves);
}