function copyInto(target, source) {
    if (target === source || isUndefinedOrNull(source)) {
        return target;
    }

    target = target || {};

    // Copy into objects only
    if (isObject(target)) {
        // Make sure source exists
        source = source || {};

        if (isObject(source)) {
            var i, newTarget, newSource;
            for (i in source) {
                if (source.hasOwnProperty(i)) {
                    newTarget = target[i];
                    newSource = source[i];

                    if (newTarget && isObject(newSource)) {
                        // Deep copy
                        newTarget = copyInto(target[i], newSource);
                    } else {
                        newTarget = newSource;
                    }

                    if (!isUndefined(newTarget)) {
                        target[i] = newTarget;
                    }
                }
            }
        } else {
            target = source;
        }
    }

    return target;
}