function () {
            var Cons = b.struct({
                y: {},
            }), eg;

            eg = new Cons({ y: 10 });
            eg.y = 11;
            equal(11, eg.y, "in non-strict mode, changing properties does (sadly) work");
            eg = eg.with_({});
            equal(10, eg.y, 'but with_ will restore the original value.');
        }