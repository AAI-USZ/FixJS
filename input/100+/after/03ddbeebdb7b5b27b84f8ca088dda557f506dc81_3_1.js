function () {
        var hello = $node('hello'),
            peers = $peers.create();

        peers.strengthen(hello, 1);
        equal(peers.byLoad().hello.node, hello, "Node added to by-load buffer");
        equal(peers.byLoad('hello').node, hello, ".byLoad may take load parameter");
        equal(peers.byLoad().hello.tread, 1, "Newly added node's tread is 1 (default)");

        deepEqual(Object.keys(peers.byTread()), ['1'], "Tread value added to by-tread lookup");
        equal(peers.byTread()[1].hello.node, hello, "Node added to by-tread buffer");
        equal(peers.byTread(1).hello.node, hello, "Same but with tread passed as param (number)");
        equal(peers.byTread('1').hello.node, hello, "Same but with tread passed as param (string)");
        equal(peers.byTread(1, 'hello').node, hello, "Same but with tread and load passed as params");
    }