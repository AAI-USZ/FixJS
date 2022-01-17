function cons(args) {        
        argsCheck(2, args.length, 'cons');

        var elem = args[0],
            list = args[1];

        typeCheck('list', list.type,  'cons', "second argument");

        var newList = [elem];
        for (var i = 0; i < list.value.length; i++) {
            newList.push(list.value[i]);
        }

        return Data.List(newList);
    }