function () {
        var Node = org.mikeneck.list.DoubleLinkedListNode,
            node = new Node (1);

        ok (node.isLargerThan(0), "1 is larger than 0.");
        ok (node.isSmallerThan(2), "1 is smaller than 2.");
        ok (node.equals(1), "1 is the same value as 1.");
    }