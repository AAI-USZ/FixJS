function (async, cb, limit) {
    var saves = async ? [] : new comb.Promise().callback();
    limit = limit || LIMIT;
    for (var i = 0; i < limit; i++) {
        if (async) {
            saves.push(cb(i));
        } else {
            saves = saves.chain(comb.partial(cb, i));
        }
    }
    if (async) {
        saves = new comb.PromiseList(saves, true);
    }
    return saves;
}