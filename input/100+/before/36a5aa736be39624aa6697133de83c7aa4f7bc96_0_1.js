function () {
    module ("Single List Node");
    test("initial value test", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (1);
        equal (node.value, 1, "initial value is 1");
        equal (node.next, null, "initial next is null");
    });

    test ("object case", function () {
        var ListNode = org.mikeneck.list.SingleListNode;
        try {
            new ListNode ({name : "object"});
            equal (false, true, "object cannot be get instance.");
        } catch (e) {
            equal (e.message.indexOf("Type Error"), 0, "object cannot be get instance.");
        }
    });

    test ("string case", function () {
        var ListNode = org.mikeneck.list.SingleListNode;
        try {
            new ListNode ("string");
            equal (false, true, "string cannot be get instance.");
        } catch (e) {
            equal (e.message.indexOf("Type Error"), 0, "object cannot be get instance.");
        }
    });

    test ("compare function", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            Small = org.mikeneck.list.Small,
            Equal = org.mikeneck.list.Equal,
            Large = org.mikeneck.list.Large,
            node = new ListNode (3);

        equal (node.compare(2), Large, "3 is larger than 2.");
        equal (node.compare(3), Equal, "3 equals to 3");
        equal (node.compare(4), Small, "3 is smaller than 4");
    });

    test ("setting next element", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (3);

        var next = node.setNext(4);
        equal (node.getNext().getValue(), 4, "the next of 3 is 4.");
        equal (next.getValue(), 4, "setNext returns next element");
    });

    test ("equality test", function () {
        var ListNode = org.mikeneck.list.SingleListNode,
            node1 = new ListNode (3),
            node2 = new ListNode (3);

        deepEqual (node2, node1, "value and next are same, they are thought to be same.");
    });

    module("Single Ascending List");
    test ("initialize list", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode;

        var list = new List (2);
        deepEqual (list.first, new ListNode(2), "A list initialized with number has element 2 as first.");
    });

    test ("initialize list with Node", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (3);

        var list = new List (node);
        deepEqual (list.first, node, "A list initialized with a node has it as a first element.");
    });

    test ("insert element at first position", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            node = new ListNode (3);

        var list = new List (node);
        deepEqual (list.first, node, "A list initialized with a node has it as a first element.");

        list.add (2);
        var expected = new ListNode(2);
        expected.next = node;
        deepEqual (list.first, expected, "inserting 2 into [3] becomes [2,3].");
    });

    test ("insert element at last position", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            list = new List (3);

        list.add (5);
        equal (list.first.getValue(), 3, "first node's value is 3");
        deepEqual (list.first.getNext().getValue(), 5, "second node is 5");
    });

    test ("insert element between all list", function () {
        var List = org.mikeneck.list.SingleAscendingList,
            ListNode = org.mikeneck.list.SingleListNode,
            list = new List (3);
        list.add(5);
        equal (list.first.getNext().getValue(), 5, "after inserting 5, list becomes [3,5].");

        list.add(4);
        deepEqual (list.first.getNext().getValue(), 4, "inserting 4 into [3,5] becomes [3,4,5]");
    });

    module("Double Linked List Node");
    test ("initial value test", function () {
        var Node = org.mikeneck.list.DoubleLinkedListNode,
            node = new Node (1);

        equal (node.getValue(), 1, "a node initialized with 1 has value (1).");
        equal (node.getNext(), null, "a new Node instance has no next element.");
        equal (node.getPrev(), null, "a new Node instance has no previous element.");
    });

    test ("failing initialization", 4, function () {
        var Node = org.mikeneck.list.DoubleLinkedListNode,
            list = ["string", 1, new Date(), [], function(){}];

        for (var item in list) {
            try {
                new Node (list[item]);
            } catch (e) {
                equal (e.item, list[item], "initializing with " + list[item] + " throws exception.");
            }
        }
    });

    test ("setting next node and previous node", function () {
        var Node = org.mikeneck.list.DoubleLinkedListNode,
            one = new Node (1),
            two = new Node (2),
            three = new Node (3),
            four = new Node (4);

        one.setNext(two);
        deepEqual (one.next, two, "setting 2 as next of 1 becomes 1 -> 2");
        deepEqual (two.prev, one, "setting 2 as next of 1 becomes 2 <- 1");

        four.setPrev(three);
        deepEqual (four.prev, three, "setting 3 as previous of 4 becomes 4 <- 3");
        deepEqual (three.next, four, "setting 3 as previous of 4 becomes 3 -> 4");
    });

    module("Double Linked List");
    test ("setting first node", function () {
        var List = org.mikeneck.list.DoubleLinkedList,
            Node = org.mikeneck.list.DoubleLinkedListNode,
            list = new List(1);

        ok (list.top instanceof Node, "type of List#top is ListNode.");
        deepEqual (list.top, new Node(1), "top element is 1.");

        ok (list.last instanceof Node, "type of List#last is ListNode.");
        deepEqual (list.last, new Node(1), "last element is 1.");
    });

    test ("add element", function () {
        var List = org.mikeneck.list.DoubleLinkedList,
            Node = org.mikeneck.list.DoubleLinkedListNode,
            list = new List (1);

        list.add (2);
        equal (list.top.getValue(), 1,
            "adding 2 into [1] becomes [1,2]. [" + list.toArray() + "]");
        equal (list.last.getValue(), 2,
            "adding 2 into [1] becomes [1,2]. [" + list.toArray() + "]");
        equal (list.size(), 2,
            "adding 2 into [1] becomes [1,2]. so size returns 2. [" + list.toArray() + "]");

        var next = list.top.getNext().getNext();
        deepEqual (next, list.top, "1->2->return to first element(1).");
    });

    test ("add element multi-time", function () {
        var List = org.mikeneck.list.DoubleLinkedList,
            Node = org.mikeneck.list.DoubleLinkedListNode,
            list = new List (3);

        list.add(5);
        list.add(4);
        equal (list.size(), 3,
            "[3] + 5 -> [3,5], [3,5] + 4 -> [3,4,5]. so size becomes 3. [" + list.toArray() + "]");
        equal (list.top.getNext().getValue(), 4,
            "[3] + 5 -> [3,5], [3,5] + 4 -> [3,4,5]. the second is 4. [" + list.toArray() + "]");
        equal (list.top.getNext().getNext().getValue(), 5,
            "[3] + 5 -> [3,5], [3,5] + 4 -> [3,4,5]. the third is 5. [" + list.toArray() + "]");
        equal (list.last.getValue(), 5,
            "[3] + 5 -> [3,5], [3,5] + 4 -> [3,4,5]. the last is 5. [" + list.toArray() + "]");
    });

    test("contains function", function () {
        var List = org.mikeneck.list.DoubleLinkedList,
            Node = org.mikeneck.list.DoubleLinkedListNode,
            list = new List (1);

        equal (list.contains(1), true, "[1] contains 1.");
        equal (list.contains(2), false, "[1] does not contain 2.")
    });

    test("contains function", function () {
        var List = org.mikeneck.list.DoubleLinkedList,
            Node = org.mikeneck.list.DoubleLinkedListNode,
            list = new List (1);
        list.add (2);

        equal (list.contains(1), true, "[1,2] contains 1.");
        equal (list.contains(2), true, "[1,2] contains 2.");
        equal (list.contains(3), false, "[1,2] does not contain 3");
    });
}