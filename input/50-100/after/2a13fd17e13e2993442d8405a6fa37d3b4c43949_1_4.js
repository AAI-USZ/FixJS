function neg(args) {
    	var num = args[0];
    	
        if (args.length != 1) {
            throw new Error("wrong number of arguments: needed 1, got " + args.length);
        }

        if (num.type !== 'number') {
            throw new Error("primitive 'neg' requires a number (got " + num.type + ")");
        }
        return Data.Number(-num.value);
    }