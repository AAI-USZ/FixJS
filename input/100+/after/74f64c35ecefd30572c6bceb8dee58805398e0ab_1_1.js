function () {
        var index = $Index.create()
            .add('foo', 5) // 0
            .add('bar', 1) // 1
            .add('hello', 2) // 2
            .add('world', 1)
            .remove('bar')
            .remove('world');

        deepEqual(index._loads, ['foo', undefined, 'hello', undefined], "Loads before re-addition");
        deepEqual(index._lookup, {'foo': 0, 'hello': 2}, "Lookup before re-addition");
        deepEqual(index._slots, {1: {1: true, 3: true}}, "Empty slots before re-addition");
        equal(index.slotCount, 2, "Slot count before re-addition");

        // re-adding one entry
        index.add('bam', 1);
        deepEqual(index._loads, ['foo', 'bam', 'hello', undefined], "Loads after re-addition");
        deepEqual(index._lookup, {'foo': 0, 'hello': 2, 'bam': 1}, "Lookup after re-addition");
        deepEqual(index._slots, {1: {3: true}}, "Empty slots after re-addition");
        equal(index.slotCount, 1, "Slot count after re-addition");

        // filling all remaining slots
        index.add('whoop', 1);
        deepEqual(index._loads, ['foo', 'bam', 'hello', 'whoop'], "Loads after re-addition");
        deepEqual(index._lookup, {'foo': 0, 'hello': 2, 'bam': 1, 'whoop': 3}, "Lookup after re-addition");
        deepEqual(index._slots, {}, "Empty slots after re-addition");
        equal(index.slotCount, 0, "Slot count after re-addition");
    }