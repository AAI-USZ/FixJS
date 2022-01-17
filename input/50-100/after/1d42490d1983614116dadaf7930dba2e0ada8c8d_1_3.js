function(item) {
        if (item.elm !== undefined) {
            return false;
        }
        /* If item source does not exists, use the first item in list as
        source for new items */
        var newItem = itemSource.cloneNode(true);
        newItem.id = "";
        item.elm = newItem;
        templater.set(item, item.values());
        return true;
    }