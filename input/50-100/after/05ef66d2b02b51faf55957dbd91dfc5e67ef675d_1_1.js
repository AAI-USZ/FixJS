function () {
        var peers = $Peers.create()
                .add($Peer.create('foo', 1))
                .add($Peer.create('bar', 1))
                .add($Peer.create('hello', 1)),
            next = peers.random();

        equal($Peer.isPrototypeOf(next), true, "Random returns Peer object");
        ok(next.load in {'foo': 1, 'bar': 1, 'hello': 1}, "Random is one of the connected peers");
    }