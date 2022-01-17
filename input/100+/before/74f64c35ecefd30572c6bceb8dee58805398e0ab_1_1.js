function () {
        var index = $Index.create()
            .add('foo', 5) // 0
            .add('bar', 1) // 1
            .add('hello', 2) // 2
            .remove('bar');

        deepEqual(index._loads, ['foo', undefined, 'hello'], "Loads before re-addition");
        deepEqual(index._lookup, {'foo': 0, 'hello': 2}, "Lookup before re-addition");
        deepEqual(index._slots, {1: {1: true}}, "Empty slots before re-addition");
        equal(index.slotCount, 1, "Slot count before re-addition");

        index.add('world', 1);

        deepEqual(index._loads, ['foo', 'world', 'hello'], "Loads after re-addition");
        deepEqual(index._lookup, {'foo': 0, 'hello': 2, 'world': 1}, "Lookup after re-addition");
        deepEqual(index._slots, {}, "Empty slots after re-addition");
        equal(index.slotCount, 0, "Slot count after re-addition");
    }