function (object, klass) {
        if (object === null) {
            return false;
        }

        var proto = Object.getPrototypeOf(object);
        // todo test nested class
        //noinspection RedundantIfStatementJS
        if (proto == klass.proto) {
            return true;
        }

        return false;
    }