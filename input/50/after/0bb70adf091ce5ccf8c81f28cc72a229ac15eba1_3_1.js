function () {
        moduleFake = {
            myValue: 0,    // copy by value
            myReference: {}       // copy by reference
        };

        vm.runInNewContext(
            "__set__ = " + __set__.toString() + "; " +
            "getValue = function () { return myValue; }; " +
            "getReference = function () { return myReference; }; ",
            moduleFake
        );
    }