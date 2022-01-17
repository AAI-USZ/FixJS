function () {
        var peers = $Peers.create();

        peers
            .tread('hello', 5)
            .tread('foo', 4);

        deepEqual(Object.keys(peers.toJSON()), ['hello', 'foo'], "Peers properties sent to JSON");

        equal(
            JSON.stringify(peers),
            '{"hello":' + JSON.stringify(peers.lookup.hello) + ',"foo":' + JSON.stringify(peers.lookup.foo) + '}',
            "Full peers JSON"
        );
    }