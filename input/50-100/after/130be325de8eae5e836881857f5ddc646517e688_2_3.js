function () {
            var Cons = b.struct({
                x: {},
                y: {}
            }), eg;

            eg = new Cons({ x: 5, y: 10 });
            eg.y = 11;
            equal(11, eg.y, "in non-strict mode, changing properties does (sadly) work");
            eg = eg.with_({x: 6});
            equal(10, eg.y, 'but with_ will restore the original value.');
        }