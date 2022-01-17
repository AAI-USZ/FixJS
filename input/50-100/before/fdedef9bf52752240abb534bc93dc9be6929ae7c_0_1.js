function(args) {
            assert_signature("define", args, "symbol", "*");
            return rt.ns[args[0].value] = rt.eval(args[1]);
        }