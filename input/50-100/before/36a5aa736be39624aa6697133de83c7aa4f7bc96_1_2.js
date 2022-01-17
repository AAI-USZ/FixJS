function (item) {
        var Node = org.mikeneck.list.DoubleLinkedListNode;
        if (item instanceof Node === false) {
            return this.value < item.value;
        } else if (typeof item === "number") {
            return this.value < item;
        } else {
            return false;
        }
    }