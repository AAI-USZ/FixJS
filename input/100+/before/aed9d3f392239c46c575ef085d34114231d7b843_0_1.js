function(path) {
    var step;
    var result = [];
    var carry = jpath.util.carry;
    var flatten = jpath.util.flatten;
    var compact = jpath.util.compact;
    var steps = path.split(reSplit).slice(1);

    while (step = steps.shift()) {
        var match = step.match(rePredicate);

        // если удалось извлечь предикат
        if (match) {
            result.push('node', match[1]);

            var tokens = [];
            var predicate = match[2];
            for (var type in reTokens) {
                predicate = predicate.replace(reTokens[type], carry(replace, tokens, type));
            }
            tokens = flatten(compact(tokens));
            tokens = regroup(tokens);

            result.push('predicate');
            result.push(tokens);

        } else {
            result.push('node', step);
        }
    }

    return result;
}