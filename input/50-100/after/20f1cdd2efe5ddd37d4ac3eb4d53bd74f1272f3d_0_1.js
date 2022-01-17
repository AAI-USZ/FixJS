function (items, shallow) {
        if (items.length === 0) {
            return Pair.nil;
        }

        var first;
        if (shallow) {
            first = items[0];
        } else {
            first = obj.squimify(items[0]);
        }

        return new Pair(first, obj.util.arrayToPair(items.slice(1), shallow));
    }