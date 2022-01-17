function (items) {
        if (items.length === 0) {
            return Pair.nil;
        }

        var first = obj.squimify(items[0]);

        return new Pair(first, obj.util.arrayToPair(items.slice(1)));
    }