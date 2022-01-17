function () {
        var hello = $node('hello'),
            peers = $peers.create();

        equal(peers.totalTread, 0, "Total tread initially zero");

        peers.addNode(hello);
        deepEqual(Object.keys(peers.byTread()), ['1'], "Node added once");
        equal(peers.totalTread, 1, "Total tread equals to tread of only element");

        peers.addNode(hello);
        deepEqual(Object.keys(peers.byTread()), ['2'], "Tread lookup follows changes in tread");
        equal(peers.totalTread, 2, "Total tread follows tread change of only element");

        peers.addNode($node('world'));
        deepEqual(Object.keys(peers.byTread()).sort(), ['1', '2'], "Tread lookup follows node addition");
        equal(peers.totalTread, 3, "Total tread follows node addition");

        peers.addNode(hello, 3);
        equal(peers.totalTread, 6, "Tread of one node increased by custom wear");
    }