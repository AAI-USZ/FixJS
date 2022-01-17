function neg(args) {
        argsCheck(1, args.length, 'neg');

        var num = args[0];

        typeCheck('number', num.type, 'neg', 'only argument');

        return Data.Number(-num.value);
    }