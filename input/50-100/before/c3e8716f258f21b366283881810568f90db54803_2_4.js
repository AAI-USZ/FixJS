function() {
            var to = {
                'content-type': ['foo']
            };
            var from = {
                'content-type': ['bar']
            };
            var expected = {
                'content-type': ['bar']
            };
            var result = Y.mojito.util.metaMerge(to, from);
            OA.areEqual(expected['content-type'], result['content-type'], "result array should have been overridden");
        }