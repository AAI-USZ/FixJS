function (list, index, results, isErrored, ret) {
    if (index < list.length) {
        var item = list[index];
        try {
            when(base.isFunction(item) ? item() : item).then(
                base.partial(callNextSuccess, list, index, results, isErrored, ret),
                base.partial(callNextError, index, results, isErrored, ret));
        } catch (e) {
            ret.errback(e);

        }
    } else {
        ret.callback(results);
    }
}