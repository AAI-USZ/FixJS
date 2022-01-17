function () {
        var
            peers = $peers.create(),
            stats,
            i;

        // adding peers each with a tread of 1
        peers
            .strengthen($node('hello'))
            .strengthen($node('there'))
            .strengthen($node('world'));

        equal(peers.totalTread, 3, "All peers contributed to total tread");
        equal(peers.byNorm(0).node.load, 'hello', "First peer accessed by norm");
        equal(peers.byNorm(0.4).node.load, 'there', "Second peer accessed by norm");
        equal(peers.byNorm(0.8).node.load, 'world', "Third peer accessed by norm");
        equal(peers.byNorm(1).node.load, 'world', "Third peer accessed by norm (upper extreme)");

        // statistical test
        stats = {
            hello: 0,
            there: 0,
            world: 0
        };
        for (i = 0; i < 30; i++) {
            stats[peers.byNorm((i + 1) / 30).node.load]++;
        }

        ok(stats.hello === stats.there && stats.hello === stats.world, "Statistical test passed");
    }