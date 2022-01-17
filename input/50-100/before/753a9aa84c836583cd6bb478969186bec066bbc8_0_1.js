function () {
                var transform = Y.one('#scrollview-content').getStyle('transform'),
                    offset = transform.split(',')[4].replace(')', '').trim();

                if (offset == -986 /*Chrome/Safari*/ && offset == -987 /*FF*/) {
                    Y.Assert.pass();
                }
                else {
                    Y.Assert.fail();
                }
            }