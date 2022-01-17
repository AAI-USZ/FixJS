function () {
        var Cons = b.struct({
            x: {}
        }), eg1, eg2;

        eg1 = new Cons({
            x: 0
        });
        strictEqual(eg1.x, 0, 'numeric zero should pass through the definition correctly.');
        eg2 = new Cons({
            x: undefined
        });
        strictEqual(eg2.x, undefined, 'undefined should pass through correctly.');
        notStrictEqual(eg2.x, eg1.x, 'undefined should pass through correctly.');
    }