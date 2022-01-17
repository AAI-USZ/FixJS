function (args) {

    if (args.length > 2) {

        this._InitFull(args);

    } else if (args.length == 2) {

        this._InitFromObj(args[0], args[1]);

    }

}