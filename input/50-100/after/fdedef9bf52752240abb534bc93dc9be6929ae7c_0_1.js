function(args) {
            assert_signature("define", args, "symbol", "*");
            if (rt.primitives[args[0].value] !== undefined)
                throw "defining symbol " + args[0].value +
                " would override a primitive";
            return rt.ns[args[0].value] = rt.eval(args[1]);
        }