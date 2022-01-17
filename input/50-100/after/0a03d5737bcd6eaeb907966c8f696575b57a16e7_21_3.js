function (root, path) {
        return fluid.model.composeSegments.apply(null, root ? fluid.remove_if(fluid.makeArray(arguments), function (arg) {
            if (!arg) {return true;}
        }) : [path]);
    }