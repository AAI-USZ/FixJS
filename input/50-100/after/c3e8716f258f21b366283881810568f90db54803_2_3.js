function() {
            var to = {
                arr: [1, 2, 3]
            };
            var from = {
                arr: ['hello', 'world']
            };
            var expected = {
                arr: [1,2,3,'hello', 'world']
            };
            var result = Y.mojito.util.metaMerge(to, from);
            AA.itemsAreEqual(expected.arr, result.arr,
                "result array should have added elements");
        }