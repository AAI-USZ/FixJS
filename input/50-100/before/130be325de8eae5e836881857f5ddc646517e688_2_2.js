function () {
            var Cons = b.struct({
                x: {},
            }), eg;

            eg = new Cons({ x: 13 });
            raises(function () {
                eg.x = 14;
            });
        }