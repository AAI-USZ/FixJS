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
            AA.itemsAreEqual(expected['content-type'], result['content-type'], "result array should have been overridden");
        }