function() {
            var to = {};
            var from = {
                arr: ['hello', 'world']
            };
            var result = Y.mojito.util.metaMerge(to, from);
            OA.areEqual(from, result, "result should be same as from");
        }